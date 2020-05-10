  
const express = require('express');
const router = express.Router();
const stateController = require('../controller/state.controller');


router.get('/timeseries', stateController.getTimeseries);
router.get('/timeseries/:uf', stateController.getTimeseriesByUf);
router.get('/last', stateController.getLastData);
router.get('/last/:uf', stateController.getLastDataByUf);


module.exports = router;

