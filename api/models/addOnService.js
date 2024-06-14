const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Member = require('./member');

const AddOnService = sequelize.define('AddOnService', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlyAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});


module.exports = AddOnService;
