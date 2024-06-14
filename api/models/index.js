const Sequelize = require("sequelize");
const config = require("../../config/db");

const __models = {
  Member: "member",
  Membership: "membership",
  AddOnService: "addOnService"
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  pool: config.pool,
  logging: Boolean(config.logging),
  retry: config.retry,
});


const models = {
  Sequelize,
  sequelize,
};

const __loadModels = () => {
  for (const key of Object.keys(__models)) {
    models[key] = require(`./${__models[key]}.js`)(sequelize, Sequelize);
  }
};

__loadModels();

models.Membership.belongsTo(models.Member, { foreignKey: "member" });
models.Member.hasMany(models.Membership, { foreignKey: "member" });
models.Member.hasMany(models.AddOnService);
models.AddOnService.belongsTo(models.Member);
module.exports = models;
