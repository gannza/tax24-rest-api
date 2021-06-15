'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('trips', [{
      driverId: 1,
      riderId: 1,
      from: 'Kigali',
      to: 'Kayonza',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('trips', null, {});
  }
};
