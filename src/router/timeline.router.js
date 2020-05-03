  
const express = require('express');
const router = express.Router();
const timelineController = require('../controller/timeline.controller');

router.get('/', timelineController.getTimeline);

module.exports = router;