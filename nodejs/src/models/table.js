"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Table.belongsTo(models.Restaurant, {
        foreignKey: "restaurantId",
        targetKey: "id",
        as: "restaurantData",
      });

      Table.hasMany(models.Booking, {
        foreignKey: "tableId",
      });
    }
  }
  Table.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      position: DataTypes.STRING,
      restaurantId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Table",
    }
  );
  return Table;
};
