'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      trip.belongsTo(
        models.driver,
        { foreignKey: 'driverId' },
        { onDelete: 'cascade' },
        { onUpdate: 'cascade' },
      );
      trip.belongsTo(
        models.rider,
        { foreignKey: 'riderId' },
        { onDelete: 'cascade' },
        { onUpdate: 'cascade' },
      );
    }
  };
  trip.init({
    driverId: DataTypes.INTEGER,
    riderId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trip',
  });
  return trip;
};