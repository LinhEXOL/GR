"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   Hp.belongsTo(models.Allcode, {
      //     foreignKey: "priceId",
      //     targetKey: "keyMap",
      //     as: "priceData",
      //   });
      //   Hp.belongsTo(models.Allcode, {
      //     foreignKey: "paymentId",
      //     targetKey: "keyMap",
      //     as: "paymentData",
      //   });
      //   Hp.belongsTo(models.Allcode, {
      //     foreignKey: "provinceId",
      //     targetKey: "keyMap",
      //     as: "provinceData",
      //   });
      //   Hp.hasOne(models.Markdown, { foreignKey: "hpId" });
      Hp.belongsTo(models.Hotpot, {
        foreignKey: "hotpotId",
        targetKey: "id",
      });
      //   Hp.belongsTo(models.Type, {
      //     foreignKey: "typeId",
      //     targetKey: "id",
      //   });
    }
  }
  Hp.init(
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
      hotpotId: {
        type: DataTypes.INTEGER,
      },
      note: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Hp",
    }
  );
  return Hp;
};
