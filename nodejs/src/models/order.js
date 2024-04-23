"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customerData",
      });
      Order.belongsTo(models.Table, {
        foreignKey: "tableId",
        targetKey: "id",
        as: "tableData",
      });
      Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    }
  }
  Order.init(
    {
      customerId: DataTypes.INTEGER,
      tableId: DataTypes.INTEGER,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      status: DataTypes.STRING,
      total_price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
