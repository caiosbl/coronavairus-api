  
const express = require('express');
const router = express.Router();
const countryController = require('../controller/country.controller');


router.get('/', countryController.getAll);


module.exports = router;

