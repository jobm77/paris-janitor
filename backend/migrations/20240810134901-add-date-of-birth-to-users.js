'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('users', 'dateOfBirth', {
       type: DataTypes.DATE,
       allowNull: false
     });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'dateOfBirth');
  }
};
