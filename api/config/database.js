require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use the connection string from the environment variables
const connectionString = process.env.DB_CONNECTION_STRING;

const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
});

module.exports = sequelize;
