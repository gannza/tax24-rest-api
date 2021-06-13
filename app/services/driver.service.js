const db = require("../models");
const Driver = db.drivers;
const Op = db.Sequelize.Op;

exports.save = async (payload) => {
    try {
            return await Driver.create(payload);

    } catch (error) {
      return error;
    }
  };


  
exports.all = async (params) => {
    try {

        return await Driver.findAndCountAll(params)

    } catch (error) {
      return error;
    }
  };
  exports.findById = async (id) => {
    try {
        
        return await Driver.findByPk(id)

    } catch (error) {
      return error;
    }
  };

  exports.update = async (payload,id) => {
    try {
        
        return await Driver.update(payload, {
            where: { id: id }
          })

    } catch (error) {
      return error;
    }
  };
  exports.destroy = async (id) => {
    try {
        
        return await Driver.destroy({
            where: { id: id }
          })

    } catch (error) {
      return error;
    }
  };

