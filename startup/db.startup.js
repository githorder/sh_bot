const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  database: "test",
  dialect: "mysql",
  username: "root",
  password: "Universe2000@",
  typeCast: true,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+05:00",
  },
  timezone: "+05:00",
  logging: false,
});

module.exports = sequelize;
