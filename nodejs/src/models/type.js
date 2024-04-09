"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.hasMany(models.Hotpot, {
        foreignKey: "typeId",
        as: "typeDataHotpot",
      });
      Type.hasMany(models.Restaurant, {
        foreignKey: "typeId",
        as: "typeDataRestaurant",
      });
    }
  }
  Type.init(
    {
      name: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Type",
    }
  );
  return Type;
};
