const StateController = require('../controller/state.controller');
const NewsController = require('../controller/news.controller');
const BrazilController = require('../controller/brazil.controller');

const updateStates = StateController.updateStates;
const updateNews = NewsController.updateNews;
const updateBrazilData = BrazilController.update;


const UPDATE_NEWS_INTERVAL = process.env.UPDATE_INTERVAL;
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL;



updateBrazilData();
updateNews();
updateStates();


setInterval(updateNews, UPDATE_NEWS_INTERVAL);
setInterval(updateStates, UPDATE_INTERVAL);
setInterval(updateBrazilData, UPDATE_INTERVAL);
