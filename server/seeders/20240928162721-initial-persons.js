'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('People', [
      {
        name: 'John Doe',
        age: 30,
        city: 'Cebu City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jane Smith',
        age: 25,
        city: 'Mandaue City',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mary Johnson',
        age: 35,
        city: 'Lapu-Lapu City',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};
