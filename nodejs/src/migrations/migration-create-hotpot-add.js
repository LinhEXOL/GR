module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Hotpots", "longitude", {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.addColumn("Hotpots", "latitude", {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.addColumn("Hotpots", "address", {
        type: Sequelize.TEXT,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Hotpots", "note")]);
  },
};
