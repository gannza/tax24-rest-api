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
const TripService = require("../services/trip.service");

/*
 * @lists Method
 *  - Get a list of all trips
 */

exports.lists = (req, res) => {

    const {
        page,
        size,
        status,
        driverId,
        riderId
    } = req.query;
    const {
        limit,
        offset
    } = getPagination(page, size);

    var condition = status || driverId || riderId ? {
        status: {
            [Op.like]: `%${status}%`
        },
        driverId: {
            [Op.eq]: driverId
        },
        riderId: {
            [Op.eq]: riderId
        }
    } : null;

    var params = {
        where: condition,
        limit,
        offset
    };

    TripService.all(params)
        .then(data => {
            if (data) {
                const response = getPagingData(data, page, limit);
                return success(res, "Get a list of all trips", 200, response);
            } else {
                return error(res, "No Trips found", 404);
            }

        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while getting the Trips.", 500);

        });
};

/*
 * @store Method
 *  - Store a trip
 */

exports.store = (req, res) => {

    // Create a Trip
    const payload = {
        driverId: req.body.driverId,
        riderId: req.body.riderId,
        from: req.body.from,
        to: req.body.to,
        status: req.body.status
    };

    // Save Trip in the database

    TripService.save(payload)
        .then(trip => {
            return success(res, "Trip Created", 201, trip);
        })
        .catch(err => {
            return error(res, err.message || "Some error occurred while creating the Trip.", 500);

        });
};

exports.show = (req, res) => {
    const id = req.params.tripId;
    if (!id) {
        return error(res, err.message || "Trip Id is required ", 400);
    }

    TripService.findById(id)
        .then(trip => {
            if (trip) {
                return success(res, "Retrieving a trip", 200, trip);
            } else {
                return error(res, "No Trip found", 404);
            }
        })
        .catch(err => {
            return error(res, err.message || "Error retrieving Trip with id=" + id, 500);

        });
};
exports.update = (req, res) => {
    const id = req.params.tripId;
    if (!id) {
        return error(res, err.message || "Trip Id is required ", 400);
    }
    const payload = {
        driverId: req.body.driverId,
        riderId: req.body.riderId,
        from: req.body.from,
        to: req.body.to,
        status: req.body.status
    };

    TripService.update(payload, id)
        .then(num => {

            if (num == 1) {
                return success(res, "Trip updated", 200, payload);
            } else {
                return error(res, `Cannot update Trip with id=${id}. Maybe Trip was not found!`, 400);
            }
        })
        .catch(err => {
            return error(res, err.message || "Error updating Trip with id=" + id, 500);

        });
};

exports.destroy = (req, res) => {
    const id = req.params.tripId;
    if (!id) {
        return error(res, err.message || "Trip Id is required ", 400);
    }

    if (id == 'deleteAll') {
        TripService.truncate()
            .then(num => {
                return success(res, "Trips deleted successfully.", 200, null);
            })
            .catch(err => {
                return error(res, err.message || "Error deleting Trip with id=" + id, 500);

            });
    } else {
        TripService.destroy(id)
            .then(num => {

                if (num == 1) {
                    return success(res, "Trip was deleted successfully.", 204, null);
                } else {
                    return error(res, `Cannot deleted Trip with id=${id}. Maybe Trip was not found!`, 400);
                }
            })
            .catch(err => {
                return error(res, err.message || "Error deleting Trip with id=" + id, 500);

            });
    }
};