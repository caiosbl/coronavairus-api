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
        
    },

    numberOfDeaths: {
        type: Number, 
        unique: true,
       
    },

    numberOfRecovered: {
        type: Number, 
        unique: true,
       
    }

}, { autoIndex: true });

const normalizeKey = (value) => {


    if (!value) return null;
    
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
        numberOfCases: normalizeKey(this.numberOfCases),
        numberOfDeaths: normalizeKey(this.numberOfDeaths),
        numberOfRecovered: normalizeKey(this.numberOfRecovered)
    }
}

/**
 * 
 * @constructor 
 * 
 */

timeline.methods.create = function create(req) {


    let date = req.date;
    let numberOfCases = req.numberOfCases;
    let numberOfDeaths = req.numberOfDeaths;
    let numberOfRecovered = req.numberOfRecovered;

    this.date = date;
    if(numberOfCases) this.numberOfCases = numberOfCases;
    if(numberOfDeaths) this.numberOfDeaths = numberOfDeaths;
    if(numberOfRecovered) this.numberOfRecovered = numberOfRecovered;
    
}


module.exports = mongoose.model('Timeline', timeline);