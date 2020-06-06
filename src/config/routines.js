const StateController = require('../controller/state.controller');
const NewsController = require('../controller/news.controller');
const BrazilController = require('../controller/brazil.controller');
const WorldController = require('../controller/world.controller');
const PredictionController = require('../controller/predictions.controller');
const CountryController = require('../controller/country.controller');
const TestController = require('../controller/test.controller');
const InsightController = require('../controller/insight.controller');
const TimelineController = require('../controller/timeline.controller');


const updateStates = StateController.updateStates;
const updateNews = NewsController.updateNews;
const updateBrazilLive = BrazilController.update;
const updateWorldLive = WorldController.update;
const updatePredictions = PredictionController.update;
const updateCountry = CountryController.update;
const updateTests = TestController.update;
const updateInsights = InsightController.update;
const updateTimeline = TimelineController.update;

const initCountries = CountryController.init;
const initStates = StateController.init;
const initTests = TestController.init;




const UPDATE_NEWS_INTERVAL = process.env.UPDATE_NEWS_INTERVAL;
const UPDATE_PREDICTIONS_INTERVAL = process.env.UPDATE__PREDICTIONS_INTERVAL;
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL;
const UPDATE_INSIGHTS = process.env.UPDATE_INSIGHTS;


const init = () => {
    initCountries();
    initStates();
    initTests();
}

const update = () => {
    updateBrazilLive();
    updateWorldLive();
    updateNews();
    updateStates();
    updatePredictions();
    updateCountry();
    updateTests();
    updateInsights(); 
    updateTimeline(); 
    
    setInterval(updateNews, UPDATE_NEWS_INTERVAL);
    setInterval(updateStates, UPDATE_INTERVAL);
    setInterval(updateBrazilLive, UPDATE_INTERVAL);
    setInterval(updateWorldLive, UPDATE_INTERVAL);
    setInterval(updatePredictions, UPDATE_PREDICTIONS_INTERVAL);
    setInterval(updateCountry, UPDATE_INTERVAL);
    setInterval(updateTests, UPDATE_INTERVAL);
    setInterval(updateInsights, UPDATE_INSIGHTS);
    setInterval(updateTimeline, UPDATE_INTERVAL);
}

//update();

