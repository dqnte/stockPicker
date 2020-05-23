const Sequelize = require('sequelize');
const crypto = require('crypto');

const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
  },

  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 500000,
  },
});

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

// Removes password when sent to client
User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.password;
  delete values.salt;
  return values;
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(user => {
  setSaltAndPassword(user);
});

User.beforeUpdate(user => {
  setSaltAndPassword(user);
});

module.exports = User;
