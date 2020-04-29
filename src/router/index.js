var express = require('express');
var router = express.Router();
const stateRouter = require('./state.router');
const newsRouter = require('./news.router');
const brazilRouter = require('./brazil.router');
const worldRouter = require('./world.router');
const predictionsRouter = require('./prediction.router');



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coronavairus Api' });
});

router.use('/state', stateRouter);
router.use('/news', newsRouter);
router.use('/brazil', brazilRouter);
router.use('/world', worldRouter);
router.use('/prediction', predictionsRouter);



module.exports = router;
