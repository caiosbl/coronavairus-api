var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var news = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String
    },

    author: {
        type: String,
     
    },
    date: {
        type: Date,
        required: true
    },
    source: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    }

}, {autoIndex: true});


news.methods.getInfo = function getInfo() {
    return {
       title: this.title,
       description: this.description,
       content: this.content,
       image: this.image,
       author: this.author,
       date: this.date,
       source: this.source,
       url: this.url,
       id: this._id
    }
}

/**
 * 
 * @constructor 
 * 
 */

news.methods.createNews = function createNews(req) {

    let title = req.title;
    let description = req.description;
    let content = req.content;
    let image = req.image;
    let author = req.author;
    let date = new Date(req.date);
    let source = req.source;
    let url = req.url;


    this.title = title;
    this.description = description;
    this.content = content;
    this.image = image;
    this.author = author;
    this.date = date;
    this.source = source;
    this.url = url;
}

news.methods.getId = function getId() {

    return this._id;

};

news.methods.getDate = function getId() {

    return this.date;

};






module.exports = mongoose.model('News', news);