'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rider.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.STRING,
    status: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    streetName: DataTypes.STRING,
    streetNumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rider',
  });
  return rider;
};