const Sequelize = require('sequelize');
const db = require('../db');

const Trade = db.define('trade', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },

  type: {
    type: Sequelize.ENUM('buy', 'sell'),
    allowNull: false,
  },

  numChange: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  askingPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Trade;
