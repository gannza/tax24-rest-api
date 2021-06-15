const express = require('express');
const DriversController = require('../../app/controllers/drivers.controller');
const DriverValidationMiddleware = require('../../app/middleware/driver-validation-middleware');
const router = express.Router();

// ******************************** DRIVERS API ******************************************************

router.get('/', DriversController.lists);

router.post('/', DriverValidationMiddleware.request, DriversController.store)
router.get('/available', DriversController.getAvailable);
router.get('/:lat/:lon', DriversController.getAvailableDriversWithInSpecificLocation);
router.patch( '/:driverId', DriverValidationMiddleware.request, DriversController.update)
router.get( '/:driverId', DriversController.show);
router.delete( '/:driverId', DriversController.destroy);


// ******************************** END DRIVERS API ***************************************************

module.exports = router;