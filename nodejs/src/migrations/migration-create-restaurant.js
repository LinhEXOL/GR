"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Restaurants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      averagePrice: {
        type: Sequelize.STRING,
      },
      provinceId: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.TEXT,
      },
      typeId: {
        type: Sequelize.INTEGER,
      },
      longitude: {
        type: Sequelize.DOUBLE,
      },
      latitude: {
        type: Sequelize.DOUBLE,
      },
      staffId: {
        type: Sequelize.INTEGER,
      },
      isOpen: {
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.DOUBLE,
      },
      isDelete: {
        type: Sequelize.INTEGER,
      },
      openTime: {
        type: Sequelize.STRING,
      },
      closeTime: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Restaurants");
  },
};
