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
        type: DataTypes.BLOB("long"),
      },
      averagePrice: {
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
      isOpen: {
        type: DataTypes.INTEGER,
      },
      openTime: {
        type: DataTypes.STRING,
      },
      closeTime: {
        type: DataTypes.STRING,
      },
      rate: {
        type: DataTypes.DOUBLE,
      },
      isDelete: {
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
