var express = require('express');
var router = express.Router();
const stateRouter = require('./state.router');
const newsRouter = require('./news.router');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coronavairus Api' });
});

router.use('/state', stateRouter);
router.use('/news', newsRouter);



module.exports = router;
