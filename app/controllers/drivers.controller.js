const {
    success,
    error
} = require("../helpers/apiResponse");
const {
    getPagingData,
    getPagination,
    getDriverByLocation
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
            if (data) {
                const response = getPagingData(data, page, limit);
                return success(res, "Get a list of all drivers", 200, response);
            } else {
                return error(res, "No Drivers found", 404);
            }

        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while getting the Drivers.", 500);

        });
};


exports.getAvailable = (req, res) => {

    const {page,size} = req.query;

    const {limit,offset} = getPagination(page, size);
  
    var params = { where: { status: 'Available' } ,limit,offset};

    DriverService.all(params)
        .then(data => {
            if (data) {
                const response = getPagingData(data, page, limit);
                return success(res, "List of available Drivers", 200, response);
            } else {
                return error(res, "No Available Drivers found", 404);
            }

        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while getting the Drivers.", 500);

        });
};
//getAvailableDriversWithLocation

exports.getAvailableDriversWithInSpecificLocation = (req, res) => {

    const {page,size,lat,lon} = req.query;
  
    var params = { where: { status: 'Available' }};

    const specificLocation = {lat: lat,lon: lon};

    DriverService.all(params)
        .then(async drivers  => {

            if (drivers.count > 0) {

              const availableDriversWithInSpecLocation =  getDriverByLocation(drivers.rows,specificLocation);

                if(availableDriversWithInSpecLocation.length > 0){
                    return success(res, "List of available Drivers within Specific Location", 200, availableDriversWithInSpecLocation);
                }else{
                    return error(res, "No Drivers found", 404); 
                }
             
            } else {
                return error(res, "No Drivers found", 404);
            }

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
        status: req.body.status,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        streetName: req.body.streetName,
        streetNumber: req.body.streetNumber
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
    if (!id) {
        return error(res, err.message || "Driver Id is required ", 400);
    }

    DriverService.findById(id)
        .then(driver => {
            if (driver) {
                return success(res, "Retrieving a driver", 200, driver);
            } else {
                return error(res, "No Driver found", 404);
            }
        })
        .catch(err => {
            return error(res, err.message || "Error retrieving Driver with id=" + id, 500);

        });
};
exports.update = (req, res) => {
    const id = req.params.driverId;
    if (!id) {
        return error(res, err.message || "Driver Id is required ", 400);
    }
    const payload = {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        status: req.body.status,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        country: req.body.country,
        city: req.body.city,
        state: req.body.state,
        streetName: req.body.streetName,
        streetNumber: req.body.streetNumber
    };

    DriverService.update(payload, id)
        .then(num => {

            if (num == 1) {
                return success(res, "Driver updated", 200, payload);
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
    if (!id) {
        return error(res, err.message || "Driver Id is required ", 400);
    }

    if (id == 'deleteAll') {
        DriverService.truncate()
            .then(num => {
                return success(res, "Drivers deleted successfully.", 200, null);
            })
            .catch(err => {
                return error(res, err.message || "Error deleting Driver with id=" + id, 500);

            });
    } else {
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
    }
};