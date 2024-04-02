module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      // queryInterface.addColumn("Hotpots", "longitude", {
      //   type: Sequelize.DOUBLE,
      // }),
      // queryInterface.addColumn("Hotpots", "latitude", {
      //   type: Sequelize.DOUBLE,
      // }),
      // queryInterface.addColumn("Hotpots", "address", {
      //   type: Sequelize.TEXT,
      // }),
      queryInterface.addColumn("Hotpots", "staffId", {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn("Hotpots", "note")]);
  },
};
