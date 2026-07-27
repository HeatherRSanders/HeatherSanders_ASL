'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      "Planets",
      "image",
      {
        type: Sequelize.STRING
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      "Planets",
      "image"
    );
  }
};