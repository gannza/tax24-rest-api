module.exports = (sequelize, Sequelize) => {
    const Driver = sequelize.define("drivers", {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        number: Sequelize.STRING,
        locationId: Sequelize.INTEGER,
        status: Sequelize.STRING,
    }, {});
    Driver.associate = function (models) {
        Driver.belongsTo(
        models.location,
        { foreignKey: 'locationId' },
        { onDelete: 'cascade' },
        { onUpdate: 'cascade' },
      );
    };
  
    return Driver;
  };