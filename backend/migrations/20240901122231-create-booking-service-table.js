'use strict';

const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('booking_services', {
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'bookings',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });

    await queryInterface.addIndex('booking_services', ['bookingId']);
    await queryInterface.addIndex('booking_services', ['serviceId']);

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('booking_services');
  }
};
