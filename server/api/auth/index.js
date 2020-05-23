const router = require('express').Router();
const { User } = require('../../db');

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.statusCode(401).send('Wrong username and/or password');
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
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
