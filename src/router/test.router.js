  
const express = require('express');
const router = express.Router();
const testController = require('../controller/test.controller');


router.get('/', testController.getAllTests);
router.get('/uf/:uf', testController.getTestByUf);


module.exports = router;

