const db = require("../models");
const Rider = db.rider;

exports.save = async (payload) => {
    try {
            return await Rider.create(payload);

    } catch (error) {
      return error;
    }
  };


  
exports.all = async (params) => {
    try {

        return await Rider.findAndCountAll(params)

    } catch (error) {
      return error;
    }
  };
  exports.findById = async (id) => {
    try {
        
        return await Rider.findByPk(id)

    } catch (error) {
      return error;
    }
  };

  exports.update = async (payload,id) => {
    try {
        
        return await Rider.update(payload, {
            where: { id: id }
          })

    } catch (error) {
      return error;
    }
  };
  exports.destroy = async (id) => {
    try {
        
        return await Rider.destroy({
            where: { id: id }
          })

    } catch (error) {
      return error;
    }
  };

  exports.truncate = async () => {
    try { 
        
        return await Rider.destroy({
          where: {},
          truncate: true
        })

    } catch (error) {
      return error;
    }
  };

