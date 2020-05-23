const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
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
    get() {
      return this.getDataValue('password'); //hides password when converted to json
    },

    balance: {
      type: Sequelize.INTEGER,
      defaultValue: 500000,
    },
  },
});

module.exports = User;
