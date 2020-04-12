const StateController = require('../controller/state.controller');
const NewsController = require('../controller/news.controller');

const updateStates = StateController.updateStates;
const updateNews = NewsController.updateNews;

const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL;

updateNews();
updateStates();

setInterval(updateNews, UPDATE_INTERVAL);
setInterval(updateStates, UPDATE_INTERVAL);
