'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('documents', 'type', {
      type: DataTypes.ENUM('inspection', 'invoice', 'quote'),
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('documents', 'type');
  }
};
