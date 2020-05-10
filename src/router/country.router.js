  
const express = require('express');
const router = express.Router();
const countryController = require('../controller/country.controller');


router.get('/', countryController.getAll);
router.get('/:country', countryController.getByName);
router.get('/code/:code', countryController.getByCode);

module.exports = router;

