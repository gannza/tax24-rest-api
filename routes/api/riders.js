const express = require('express');
const RidersController = require('../../app/controllers/riders.controller');
const RiderValidationMiddleware = require('../../app/middleware/rider-validation-middleware');
const router = express.Router();

// ******************************** RIDERS API ******************************************************

router.get('/', RidersController.lists);

router.post('/', RiderValidationMiddleware.request, RidersController.store)
router.patch( '/:riderId', RiderValidationMiddleware.request, RidersController.update)
router.get( '/:riderId', RidersController.show);
router.delete( '/:riderId', RidersController.destroy);

// ******************************** END RIDERS API ***************************************************

module.exports = router;