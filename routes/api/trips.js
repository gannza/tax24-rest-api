const express = require('express');
const TripsController = require('../../app/controllers/trips.controller');
const TripValidationMiddleware = require('../../app/middleware/trip-validation-middleware');
const router = express.Router();

// ******************************** TRIPS API ******************************************************

router.get('/', TripsController.lists);

router.post('/', TripValidationMiddleware.request, TripsController.store)
router.patch( '/:tripId', TripValidationMiddleware.request, TripsController.update)
router.get( '/:tripId', TripsController.show);
router.delete( '/:tripId', TripsController.destroy);


// ******************************** END TRIPS API ***************************************************

module.exports = router;