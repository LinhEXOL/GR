"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotpot_Restaurant_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Hotpot_Restaurant_Type.init(
    {
      hotpotId: DataTypes.INTEGER,
      restaurantId: DataTypes.INTEGER,
      typeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Hotpot_Restaurant_Type",
    }
  );
  return Hotpot_Restaurant_Type;
};
