'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('riders', [{
      name: 'Ganza Respice',
      email: 'respinho2014@gmail.com',
      number: 'RAB20A',
      status: 'Active',
      latitude: -1.8389,
      longitude: 30.09969,
      country: "Rwanda",
      city: "Kayonza",
      state: "Easter province",
      streetName: "Kayonza",
      streetNumber: "KG 404 Street",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },


  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('riders', null, {});
  }
};
