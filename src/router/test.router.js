  
const express = require('express');
const router = express.Router();
const testController = require('../controller/test.controller');


router.get('/', testController.getAll);
router.get('/last', testController.getLastData);
router.get('/uf/:uf', testController.getByUf);


module.exports = router;

