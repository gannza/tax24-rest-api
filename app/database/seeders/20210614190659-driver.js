'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
     return await queryInterface.bulkInsert('drivers', [{
      name: 'Ganza Jean Respice',
      email: 'respinho2014@gmail.com',
      number: 'RAB20A',
      status: 'Active',
      latitude: -1.8389,
      longitude: 30.09969,
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
      status: 'Inactive',
      latitude: -1.8389,
      longitude: 30.09969,
      country: "Rwanda",
      city: "Kimironko",
      state: "Kigali",
      streetName: "Intwari",
      streetNumber: "KG 10st Street",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {

     return await queryInterface.bulkDelete('drivers', null, {});
  }
};
