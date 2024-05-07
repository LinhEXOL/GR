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
      Order.hasMany(models.Table, {
        onUpdate: "cascade",
        hooks: true,
      });
      Order.hasMany(models.OrderItem, { onUpdate: "cascade", hooks: true });
    }
  }
  Order.init(
    {
      resDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please enter reservation date!",
          },
          // isDateInThePast(value) {
          //   const currDate = dateTimeValidator.asDateString(new Date());
          //   if (dateTimeValidator.isDateInThePast(currDate, value))
          //     throw new Error("Given date is in the past!");
          // },
        },
      },
      resTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Please enter reservation time!",
          },
        },
      },
      people: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            arg: true,
            msg: "Should be an integer value!",
          },
          min: {
            args: [1],
            msg: "One person at least!",
          },
          max: {
            args: [20],
            msg: "Maximum 20 people per reservation!",
          },
        },
      },
      resStatus: {
        type: DataTypes.ENUM("pending", "confirmed", "seated", "missed"),
        allowNull: false,
        defaultValue: "pending",
      },
      depositAmount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
