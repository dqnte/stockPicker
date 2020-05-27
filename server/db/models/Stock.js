const Sequelize = require('sequelize');
const db = require('../db');

const Stock = db.define('stock', {
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// Set Stock string to all caps
Stock.beforeCreate(stock => {
  stock.symbol = stock.symbol.toUpperCase();
});

Stock.beforeUpdate(stock => {
  stock.symbol = stock.symbol.toUpperCase();
});

module.exports = Stock;
