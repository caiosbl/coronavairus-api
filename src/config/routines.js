const StateController = require('../controller/state.controller');
const NewsController = require('../controller/news.controller');
const BrazilController = require('../controller/brazil.controller');
const WorldController = require('../controller/world.controller');
const PredictionController = require('../controller/predictions.controller');
const CountryController = require('../controller/country.controller');
const TestController = require('../controller/test.controller');


const updateStates = StateController.updateStates;
const updateNews = NewsController.updateNews;
const updateBrazilLive = BrazilController.updateLive;
const updateWorldLive = WorldController.updateLive;
const updatePredictions = PredictionController.updateLive;
const updateCountry = CountryController.update;
const updateTests = TestController.updateTests;

const UPDATE_NEWS_INTERVAL = process.env.UPDATE_NEWS_INTERVAL;
const UPDATE_PREDICTIONS_INTERVAL = process.env.UPDATE__PREDICTIONS_INTERVAL;
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL;


updateBrazilLive();
updateWorldLive();
updateNews();
updateStates();
updatePredictions();
updateCountry();
updateTests();



setInterval(updateNews, UPDATE_NEWS_INTERVAL);
setInterval(updateStates, UPDATE_INTERVAL);
setInterval(updateBrazilLive, UPDATE_INTERVAL);
setInterval(updateWorldLive, UPDATE_INTERVAL);
setInterval(updatePredictions, UPDATE_PREDICTIONS_INTERVAL);
setInterval(updateCountry, UPDATE_INTERVAL);
setInterval(updateTests, UPDATE_INTERVAL);

