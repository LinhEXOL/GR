"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Restaurant.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      Restaurant.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      Restaurant.hasOne(models.Markdown, { foreignKey: "restaurantId" });
      Restaurant.belongsTo(models.Type, {
        foreignKey: "typeId",
        targetKey: "id",
      });
      Restaurant.belongsTo(models.User, {
        foreignKey: "staffId",
        targetKey: "id",
      });
      Restaurant.hasMany(models.Hotpot, {
        foreignKey: "restaurantId",
      });
    }
  }
  Restaurant.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      priceId: {
        type: DataTypes.STRING,
      },
      provinceId: {
        type: DataTypes.STRING,
      },
      typeId: {
        type: DataTypes.INTEGER,
      },
      address: {
        type: DataTypes.TEXT,
      },
      longitude: {
        type: DataTypes.DOUBLE,
      },
      latitude: {
        type: DataTypes.DOUBLE,
      },
      staffId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Restaurant",
    }
  );
  return Restaurant;
};
