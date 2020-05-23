const User = require('./User');
const Trade = require('./Trade');

// Relationship Definitions

User.hasMany(Trade);

module.exports = {
  User,
  Trade,
};
