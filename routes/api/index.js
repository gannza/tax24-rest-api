const express = require('express');
const DriversRoute = require('./drivers');
const RidersRoute = require('./riders');
const TripsRoute = require('./trips');

const router = express.Router();

router.use('/drivers', DriversRoute);
router.use('/riders', RidersRoute);
router.use('/trips', TripsRoute);

module.exports = router;