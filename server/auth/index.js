const axios = require('axios');
const router = require('express').Router();
const { User, PortfolioItem, Stock, Trade } = require('../db');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user && user.correctPassword(req.body.password)) {
      req.login(user, err => (err ? next(err) : res.json(user)));
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
      res.send(user);
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

      const items = await Promise.all(
        user.portfolioItems.map(async item => {
          const { data } = await axios.get(
            `https://sandbox.iexapis.com/stable/stock/${item.stock.symbol}/book`,
            {
              params: {
                token: process.env.IEX_TOKEN,
              },
            }
          );
          return { ...item.toJSON(), stock: data.quote };
        })
      );

      res.send({ ...user.toJSON(), portfolioItems: items });
    } else {
      res.send({});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
