const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    const tableDescription = await queryInterface.describeTable('properties');

    if (!tableDescription.type) {
      await queryInterface.addColumn('properties', 'type', {
        type: DataTypes.STRING,
        allowNull: false,
      });
    }

    if (!tableDescription.bedrooms) {
      await queryInterface.addColumn('properties', 'bedrooms', {
        type: DataTypes.INTEGER,
        allowNull: false,
      });
    }

    if (!tableDescription.bathrooms) {
      await queryInterface.addColumn('properties', 'bathrooms', {
        type: DataTypes.INTEGER,
        allowNull: false,
      });
    }

    if (!tableDescription.area) {
      await queryInterface.addColumn('properties', 'area', {
        type: DataTypes.FLOAT,
        allowNull: false,
      });
    }

    if (!tableDescription.amenities) {
      await queryInterface.addColumn('properties', 'amenities', {
        type: DataTypes.JSON, // Utilisez JSON pour stocker un tableau de chaînes
        allowNull: true,
      });
    }
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('properties', 'type');
    await queryInterface.removeColumn('properties', 'bedrooms');
    await queryInterface.removeColumn('properties', 'bathrooms');
    await queryInterface.removeColumn('properties', 'area');
    await queryInterface.removeColumn('properties', 'amenities');
  }
};
