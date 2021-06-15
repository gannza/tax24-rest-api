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
    },
    {

      name: 'Muhoracyeye Rebecca',
      email: 'muhoracyer@gmail.com',
      number: 'RAA20A',
      status: 'Available',
      latitude: -1.920231594130813,
      longitude: 30.056408655828637,
      country: "Rwanda",
      city: "Gisozi",
      state: "Kigali",
      streetName: "33H4+WH Kigali",
      streetNumber: "KG 14 Ave, Kigali",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {

     return await queryInterface.bulkDelete('drivers', null, {});
  }
};
