const { DataTypes } = require("sequelize");

const sequelize = require("../startup/db.startup");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  tgName: { type: DataTypes.STRING, allowNull: true },
  name: { type: DataTypes.STRING, allowNull: true },
  username: {
    type: DataTypes.STRING,
  },
  phone: { type: DataTypes.STRING, allowNull: true },
  chatId: {
    type: DataTypes.STRING,
    unique: true,
  },
  sessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  session: {
    type: DataTypes.JSON,
  },
  design: { type: DataTypes.STRING, allowNull: true },
  square: { type: DataTypes.FLOAT, allowNull: true },
  style: { type: DataTypes.JSON, allowNull: true, defaultValue: [] },
  price: { type: DataTypes.STRING, allowNull: true },
  time: { type: DataTypes.STRING, allowNull: true },
  requestedCall: { type: DataTypes.TINYINT, defaultValue: 0 },
  state: { type: DataTypes.STRING, allowNull: true },
  postNumber: { type: DataTypes.SMALLINT, allowNull: true },
  itemId: { type: DataTypes.STRING, allowNull: true },
  finalAnswer: { type: DataTypes.STRING, allowNull: true },
});

module.exports = User;
