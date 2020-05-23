const User = require('./User');
const Transaction = require('./Transaction');

// Relationship Definitions

User.hasMany(Transaction);

module.exports = {
  User,
  Transaction,
};
