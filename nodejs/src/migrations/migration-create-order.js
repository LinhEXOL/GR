"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      resDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      resTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      people: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      resStatus: {
        type: Sequelize.ENUM("pending", "seated", "missed", "comfirmed"),
        allowNull: false,
        defaultValue: "pending",
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //   model: "Users",
        //   key: "id",
        // },
        // onDelete: "CASCADE",
        // onUpdate: "CASCADE",
      },
      restaurantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      depositAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
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
    await queryInterface.dropTable("Orders");
  },
};
