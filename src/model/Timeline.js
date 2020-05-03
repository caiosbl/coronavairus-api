var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeline = new Schema({

    date: {
        type: Date,
        unique: true,
        required: true,
    },

    numberOfCases: {
        type: Number, 
        unique: true,
        required: true
    }

}, { autoIndex: true });

const normalizeKey = (value) => {
    if (value < 1000) {
        return String(value);
    }

    else {
        return `${value / 1000}k`;
    }
}


timeline.methods.getInfo = function getInfo() {
    return {
        date: this.date,
        numberOfCases: normalizeKey(this.numberOfCases)
    }
}

/**
 * 
 * @constructor 
 * 
 */

timeline.methods.create = function create(req) {


    let date = req.date;
    let numberOfCases =  req.numberOfCases;

    this.date = date;
    this.numberOfCases = numberOfCases;
}


module.exports = mongoose.model('Timeline', timeline);