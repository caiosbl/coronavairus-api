  
const express = require('express');
const router = express.Router();
const insightController = require('../controller/insight.controller');


router.get('/', insightController.getAllInsights);
router.get('/last', insightController.getLastInsights);


module.exports = router;

