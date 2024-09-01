const { DataTypes } = require('sequelize');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'images', {
      type: DataTypes.JSON,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('properties', 'images');
  }
};
