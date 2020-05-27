const axios = require('axios');
const router = require('express').Router();
const { User, Trade, Stock, PortfolioItem } = require('../../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({});
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/trades', async (req, res, next) => {
  try {
    const trades = await Trade.findAll({
      where: {
        userId: req.params.id,
      },
    });
    res.json(trades);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/buy', async (req, res, next) => {
  try {
    const { symbol, quantity } = req.body;
    if (req.user && req.user.id) {
      var data;
      try {
        const response = await axios.get(
          `https://sandbox.iexapis.com/stable/stock/${symbol}/price`,
          {
            params: {
              token: process.env.IEX_TOKEN,
            },
          }
        );
        data = response.data;
      } catch (err) {
        if (err.response.status === 404) {
          res.sendStatus(404);
          return;
        } else {
          next(err);
        }
      }

      if (req.user.balance / 100 > data * quantity) {
        // buy shares
        const [stock, created] = await Stock.findOrCreate({
          where: { symbol: symbol.toUpperCase() },
        });

        await Trade.create({
          date: Date.now(),
          type: 'buy',
          numChange: quantity,
          stockId: stock.id,
          userId: req.user.id,
        });
        const item = await PortfolioItem.findOne({
          where: { userId: req.user.id, stockId: stock.id },
        });

        if (!item) {
          await PortfolioItem.create({
            userId: req.user.id,
            stockId: stock.id,
            quantity: quantity,
          });
        } else {
          await PortfolioItem.update(
            {
              quantity: item.quantity + parseInt(quantity, 10),
            },
            {
              where: {
                userId: req.user.id,
                stockId: stock.id,
              },
            }
          );
        }

        await User.update(
          {
            balance: req.user.balance - quantity * Math.round(data * 100),
          },
          {
            where: {
              id: req.user.id,
            },
          }
        );

        res.redirect('/auth/me');
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
