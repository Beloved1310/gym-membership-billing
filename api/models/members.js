// models/member.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Member = sequelize.define('Member', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isFirstMonth: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Member;
