  
const express = require('express');
const router = express.Router();
const predictionController = require('../controller/predictions.controller');


router.get('/', predictionController.getAll);
router.get('/last', predictionController.getLastData);


module.exports = router;

