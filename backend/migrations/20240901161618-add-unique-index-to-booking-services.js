'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('booking_services', ['bookingId', 'serviceId'], { unique: true});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('booking_services', ['bookingId', 'serviceId']);
  }
};
