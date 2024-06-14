// models/membership.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');


const Membership = sequelize.define('Membership', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});



module.exports = Membership;
