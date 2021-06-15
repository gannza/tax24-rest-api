const db = require("../models");
const Trip = db.trip;

exports.save = async (payload) => {
    try {
            return await Trip.create(payload);

    } catch (error) {
      return error;
    }
  };


  
exports.all = async (params) => {
    try {

        return await Trip.findAndCountAll(params)

    } catch (error) {
      return error;
    }
  };
  exports.findById = async (id) => {
    try {
        
        return await Trip.findByPk(id)

    } catch (error) {
      return error;
    }
  };

  exports.update = async (payload,id) => {
    try {
        
        return await Trip.update(payload, {
            where: { id: id }
          })

    } catch (error) {
      return error;
    }
  };
  exports.destroy = async (id) => {
    try {
        
        return await Trip.destroy({
            where: { id: id }
          })

    } catch (error) {
      return error;
    }
  };

  exports.truncate = async () => {
    try { 
        
        return await Trip.destroy({
          where: {},
          truncate: true
        })

    } catch (error) {
      return error;
    }
  };

