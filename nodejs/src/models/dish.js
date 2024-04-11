"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      Dish.hasOne(models.Markdown, { foreignKey: "dishId" });
      Dish.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
        targetKey: "id",
      });
    }
  }
  Dish.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.BLOB("long"),
      },
      price: {
        type: DataTypes.STRING,
      },
      restaurantId: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Dish",
    }
  );
  return Dish;
};
