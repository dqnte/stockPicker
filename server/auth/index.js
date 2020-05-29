const axios = require('axios');
const router = require('express').Router();
const { User, PortfolioItem, Stock, Trade } = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && user.correctPassword(req.body.password)) {
      req.login(user, err => (err ? next(err) : res.redirect('/auth/me')));
    } else {
      res.status(401).send('Wrong username and/or password');
    }
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.status(401).send('User already exists');
    } else {
      user = await User.create(req.body);
      req.login(user, err => (err ? next(err) : res.redirect('/auth/me')));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      const user = await User.findByPk(req.user.id, {
        include: [
          { model: PortfolioItem, include: Stock },
          { model: Trade, include: Stock },
        ],
      });

      const baseURL = `https://sandbox.iexapis.com/stable/stock/market/batch`;

      if (user.portfolioItems.length > 0) {
        const { data } = await axios.get(baseURL, {
          params: {
            symbols: user.portfolioItems
              .map(item => item.stock.symbol)
              .join(','),
            types: 'quote',
            token: process.env.IEX_TOKEN,
          },
        });

        const items = user.portfolioItems.map(item => {
          return {
            id: item.id,
            quantity: item.quantity,
            stock: data[item.stock.symbol].quote,
          };
        });
        res.send({ ...user.toJSON(), portfolioItems: items });
      } else {
        res.send(user);
      }
    } else {
      res.send({});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
