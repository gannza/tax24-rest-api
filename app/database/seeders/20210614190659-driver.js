'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     return await queryInterface.bulkInsert('drivers', [{
      name: 'Ganza Jean Respice',
      email: 'respinho2014@gmail.com',
      number: 'RAB20A',
      status: 'Unvailable',
      latitude: -1.947413,
      longitude: 30.132987,
      country: "Rwanda",
      city: "Kimironko",
      state: "Kigali",
      streetName: "Intwari",
      streetNumber: "KG 10st Street",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);
  },

  down: async (queryInterface, Sequelize) => {

     return await queryInterface.bulkDelete('drivers', null, {});
  }
};
