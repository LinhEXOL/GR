"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotpot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotpot.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      Hotpot.belongsTo(models.Allcode, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "paymentData",
      });
      Hotpot.belongsTo(models.Allcode, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "provinceData",
      });
      Hotpot.hasOne(models.Markdown, { foreignKey: "hotpotId" });
      Hotpot.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
        targetKey: "id",
      });
      Hotpot.belongsTo(models.Type, {
        foreignKey: "typeId",
        targetKey: "id",
      });
      Hotpot.hasMany(models.Hp, {
        foreignKey: "hotpotId",
      });
    }
  }
  Hotpot.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      phonenumber: {
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
      paymentId: {
        type: DataTypes.STRING,
      },
      typeId: {
        type: DataTypes.INTEGER,
      },
      restaurantId: {
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
    },
    {
      sequelize,
      modelName: "Hotpot",
    }
  );
  return Hotpot;
};
