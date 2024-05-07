"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tables", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      isOccupied: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Orders",
        //   key: "id",
        // },
      },
      position: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      restaurantId: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tables");
  },
};
