  
const express = require('express');
const router = express.Router();
const newsController = require('../controller/news.controller');


router.get('/', newsController.getAllNews);
router.get('/last', newsController.getLastNews);



module.exports = router;

