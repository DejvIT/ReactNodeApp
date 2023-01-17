const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.model")(sequelize, Sequelize);
db.machine = require("../models/machine.model")(sequelize, Sequelize);
db.machinePrice = require("../models/machine_prices.model")(sequelize, Sequelize);
db.reservation = require("../models/reservation.model")(sequelize, Sequelize);
db.chat = require("../models/chat.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.reservation.belongsTo(db.user, {
  foreignKey: "user_id",
  otherKey: "id",
});
db.reservation.belongsTo(db.machine, {
    foreignKey: "machine_id",
    otherKey: "id",
});
db.machine.hasMany(db.reservation, {
    foreignKey: "machine_id",
    otherKey: "id",
});
db.machine.hasMany(db.machinePrice, {
    foreignKey: "machine_id",
    otherKey: "id",
});
db.machinePrice.belongsTo(db.machine, {
    foreignKey: "machine_id",
    otherKey: "id",
});
db.chat.belongsTo(db.user, {
  foreignKey: "user_id",
  otherKey: "id",
});
db.chat.belongsTo(db.user, {
  foreignKey: "respondent_id",
  otherKey: "id",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
