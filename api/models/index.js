const Sequelize = require('sequelize');
const connection = require('../config/database');

const Membership = require('./Membership')(connection, Sequelize);
const AddOnService = require('./AddOnService')(connection, Sequelize);
const Invoice = require('./Invoice')(connection, Sequelize);

const models = {
    Membership,
    AddOnService,
    Invoice,
};

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

const syncModels = async () => {
    await connection.sync({ force: true });
    console.log("All models were synchronized successfully.");
};

syncModels();

module.exports = models;
