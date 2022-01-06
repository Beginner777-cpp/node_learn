const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  host: "localhost",
  database: "node-complete",
  username: "root",
  password: "root",
  dialect: "mysql",
  port: 3307,
  timezone: "+05:00", //=="Asia/Tashkent"
  logging: false,
});

module.exports = sequelize;
