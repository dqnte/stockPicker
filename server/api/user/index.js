const router = require('express').Router();
const { User, Trade } = require('../../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
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

module.exports = router;
