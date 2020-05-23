const User = require('./User');
const Trade = require('./Trade');
const PortfolioItem = require('./PortfolioItem');
const Stock = require('./Stock');

// Relationship Definitions

// User
User.hasMany(Trade);

// Portfolio Item
User.hasMany(PortfolioItem);
Stock.hasMany(PortfolioItem);

// Trade
Trade.belongsTo(Stock);

module.exports = {
  User,
  Trade,
  PortfolioItem,
  Stock,
};
