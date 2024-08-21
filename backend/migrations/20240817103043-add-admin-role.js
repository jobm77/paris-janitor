'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.changeColumn('users', 'role', {
        type: DataTypes.ENUM('landlord', 'traveler', 'admin'),
        allowNull: false
      });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'role', {
      type: DataTypes.ENUM('landlord', 'traveler'),
      allowNull: false
    });
   
  }
};
