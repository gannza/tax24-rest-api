const {
    success,
    error
} = require("../helpers/apiResponse");
const {
    getPagingData,
    getPagination
} = require("../helpers/common");

const db = require("../models");
const Op = db.Sequelize.Op;
const DriverService = require("../services/driver.service");

/*
 * @lists Method
 *  - Get a list of all drivers
 */

exports.lists = (req, res) => {

    const {
        page,
        size,
        name
    } = req.query;
    const {
        limit,
        offset
    } = getPagination(page, size);
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;
    var params = {
        where: condition,
        limit,
        offset
    };

    DriverService.all(params)
        .then(data => {
            const response = getPagingData(data, page, limit);
            return success(res, "Get a list of all drivers", 200, response);
        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while getting the Drivers.", 500);

        });
};

/*
 * @store Method
 *  - Store a driver
 */

exports.store = (req, res) => {

    // Create a Driver
    const payload = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        locationId: req.body.locationId,
        status: req.body.status,
    };

    // Save Driver in the database

    DriverService.save(payload)
        .then(driver => {
            return success(res, "Driver Created", 201, driver);
        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while creating the Driver.", 500);

        });
};

exports.show = (req, res) => {
    const id = req.params.driverId;
    if(!id){
        return error(res, err.message || "Driver Id is required ", 400);
    }

    DriverService.findById(id)
    .then(driver => {
        return success(res, "retrieving a driver", 200, driver);
    })
    .catch(err => {
        return error(res, err.message || "Error retrieving Driver with id=" + id, 500);

    });
};
exports.update = (req, res) => {
    const id = req.params.driverId;
    if(!id){
        return error(res, err.message || "Driver Id is required ", 400);
    }
    const payload = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        locationId: req.body.locationId,
        status: req.body.status,
    };

    DriverService.update(payload,id)
    .then(num => {
       
        if (num == 1) {
            return success(res, "Driver was updated successfully.", 200, payload);
          } else {
            return error(res, `Cannot update Driver with id=${id}. Maybe Driver was not found!`, 400);
          }
    })
    .catch(err => {
        return error(res, err.message || "Error updating Driver with id=" + id, 500);

    });
};

exports.destroy = (req, res) => {
    const id = req.params.driverId;
    if(!id){
        return error(res, err.message || "Driver Id is required ", 400);
    }
  

    DriverService.destroy(id)
    .then(num => {
       
        if (num == 1) {
            return success(res, "Driver was deleted successfully.", 204, null);
          } else {
            return error(res, `Cannot deleted Driver with id=${id}. Maybe Driver was not found!`, 400);
          }
    })
    .catch(err => {
        return error(res, err.message || "Error deleting Driver with id=" + id, 500);

    });
};