const Sequelize = require('sequelize');

const databaseURL =
  process.env.DATABASE_URL || `postgres://localhost:5432/stockPicker`;

// Create and export DB instance
const db = new Sequelize(databaseURL, {
  logging: false,
});

module.exports = db;
