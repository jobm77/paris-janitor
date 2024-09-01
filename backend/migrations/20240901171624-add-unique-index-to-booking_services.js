'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('booking_services', 'id', {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    });

    await queryInterface.changeColumn('booking_services', 'bookingId', {
      type: DataTypes.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('booking_services', 'serviceId', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('booking_services', 'id');
  }
};
