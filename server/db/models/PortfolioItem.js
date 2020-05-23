const Sequelize = require('sequelize');
const db = require('../db');

const PortfolioItem = db.define('portfolioItem', {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = PortfolioItem;
