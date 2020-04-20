  
const express = require('express');
const router = express.Router();
const brazilController = require('../controller/brazil.controller');


router.get('/', brazilController.getTimeSeries);



module.exports = router;

