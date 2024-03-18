"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ResSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResSchedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeData",
      });
    }
  }
  ResSchedule.init(
    {
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      restaurantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ResSchedule",
    }
  );
  return ResSchedule;
};
