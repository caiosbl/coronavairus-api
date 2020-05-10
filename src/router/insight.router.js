  
const express = require('express');
const router = express.Router();
const insightController = require('../controller/insight.controller');


router.get('/', insightController.getAll);
router.get('/last', insightController.getLast);


module.exports = router;

