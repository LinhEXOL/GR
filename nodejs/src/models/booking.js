"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customerData",
      });
      Booking.belongsTo(models.Table, {
        foreignKey: "tableId",
        targetKey: "id",
        as: "tableData",
      });
    }
  }
  Booking.init(
    {
      customerId: DataTypes.INTEGER,
      tableId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
