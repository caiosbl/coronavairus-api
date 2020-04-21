  
const express = require('express');
const router = express.Router();
const worldController = require('../controller/world.controller');


router.get('/', worldController.getTimeSeries);
router.get('/last', worldController.getLastData);


module.exports = router;

