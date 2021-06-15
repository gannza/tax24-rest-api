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
const RiderService = require("../services/rider.service");

/*
 * @lists Method
 *  - Get a list of all riders
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

    RiderService.all(params)
        .then(data => {
            if (data) {
                const response = getPagingData(data, page, limit);
                return success(res, "Get a list of all riders", 200, response);
            } else {
                return error(res, "No Riders found", 404);
            }

        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while getting the Riders.", 500);

        });
};

/*
 * @store Method
 *  - Store a rider
 */

exports.store = (req, res) => {

    // Create a rider

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

    // Save a rider in the database

    RiderService.save(payload)
        .then(rider => {
            return success(res, "Rider Created", 201, rider);
        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while creating the Rider.", 500);

        });
};

exports.show = (req, res) => {
    const id = req.params.riderId;
    if (!id) {
        return error(res, err.message || "Rider Id is required ", 400);
    }

    RiderService.findById(id)
        .then(rider => {
            if (rider) {
                return success(res, "Retrieving a rider", 200, rider);
            } else {
                return error(res, "No Rider found", 404);
            }
        })
        .catch(err => {
            return error(res, err.message || "Error retrieving Rider with id=" + id, 500);

        });
};
exports.update = (req, res) => {
    const id = req.params.riderId;
    if (!id) {
        return error(res, err.message || "Rider Id is required ", 400);
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

    RiderService.update(payload, id)
        .then(num => {

            if (num == 1) {
                return success(res, "Rider updated", 200, payload);
            } else {
                return error(res, `Cannot update Rider with id=${id}. Maybe Rider was not found!`, 400);
            }
        })
        .catch(err => {
            return error(res, err.message || "Error updating Rider with id=" + id, 500);

        });
};

exports.destroy = (req, res) => {
    const id = req.params.riderId;
    if (!id) {
        return error(res, err.message || "Rider Id is required ", 400);
    }

    if (id == 'deleteAll') {
        RiderService.truncate()
            .then(num => {
                return success(res, "Riders deleted successfully.", 200, null);
            })
            .catch(err => {
                return error(res, err.message || "Error deleting Rider with id=" + id, 500);

            });
    } else {
        RiderService.destroy(id)
            .then(num => {

                if (num == 1) {
                    return success(res, "Rider was deleted successfully.", 204, null);
                } else {
                    return error(res, `Cannot deleted Rider with id=${id}. Maybe Rider was not found!`, 400);
                }
            })
            .catch(err => {
                return error(res, err.message || "Error deleting Rider with id=" + id, 500);

            });
    }
};