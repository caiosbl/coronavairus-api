  
const express = require('express');
const router = express.Router();
const stateController = require('../controller/state.controller');


router.get('/', stateController.getAllStates);
router.get('/uf/:uf', stateController.getStateByUf);


module.exports = router;

