const { DataTypes } = require("sequelize");
const sequelize = require("../connection.js");

module.exports = sequelize.define(
  "generos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);
