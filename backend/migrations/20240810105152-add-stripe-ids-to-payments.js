'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('payments', 'stripe_payment_intent_id', {
      type: DataTypes.STRING,
      allowNull: true,
     });

     await queryInterface.addColumn('payments', 'stripe_customer_id', {
      type: DataTypes.STRING,
      allowNull: true,
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('payments', 'stripe_payment_intent_id');
    await queryInterface.removeColumn('payments', 'stripe_customer_id');
  }
};
