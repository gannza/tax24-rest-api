const express = require('express');
const DriversController = require('../../app/controllers/drivers.controller');
const DriverValidationMiddleware = require('../../app/middleware/driver-validation-middleware');
const router = express.Router();

// ******************************** DRIVERS API ******************************************************

router.get('/', DriversController.lists);

router.post('/', DriverValidationMiddleware.request, DriversController.store)
router.patch( '/:driverId', DriverValidationMiddleware.request, DriversController.update)
router.get( '/:driverId', DriversController.show);
router.delete( '/:driverId', DriversController.destroy);

// router.get('/available', DriversController.getAvailableDrivers);
// router.get('/closeto/:locationId', DriversController.getDriversWithinLocation);
// router.get('/:driverId', DriversController.getSpecificDrivers);

// ******************************** END DRIVERS API ***************************************************

module.exports = router;