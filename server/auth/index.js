const router = require('express').Router();
const { User } = require('../db');

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
      const user = await User.findByPk(req.user.id);
      res.send(user);
    } else {
      res.send({});
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
