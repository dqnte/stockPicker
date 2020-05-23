const Sequelize = require('sequelize');
const db = require('../db');

const Transaction = db.define('transaction', {
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
});

module.exports = Transaction;
