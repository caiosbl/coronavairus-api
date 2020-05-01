var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var country = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    isoA2: {
        type: String,
    
    },
    isoA3: {
        type: String,
    },
    totalCases: {
        type: Number,
        required: true
    },
    newCases: {
        type: Number
    },
    activeCases: {
        type: Number
    },
    totalDeaths: {
        type: Number
    },
    newDeaths: {
        type: Number
    },
    totalRecovered: {
        type: Number
    },
    seriousCritical: {
        type: Number
    },
    lastFetch: {
        type: Date,
        required: true,
    }


}, { autoIndex: true });


country.methods.getInfo = function getInfo() {
    return {
        name: this.name,
        isoA2: this.isoA2,
        isoA3: this.isoA3,
        totalCases: this.totalCases,
        newCases: this.newCases,
        activeCases: this.activeCases,
        totalDeaths: this.totalDeaths,
        newDeaths: this.newDeaths,
        totalRecovered: this.totalRecovered,
        seriousCritical: this.seriousCritical,
        lastFetch: this.date
    }
}

/**
 * 
 * @constructor 
 * 
 */

country.methods.createCountryData = function createCountryData(req) {

    let name = req.name;
    let isoA2 = req.isoA2;
    let isoA3 = req.isoA3;
    let totalCases = req.totalCases;
    let newCases = req.newCases;
    let activeCases = req.activeCases;
    let totalDeaths = req.totalDeaths;
    let newDeaths = req.newDeaths;
    let totalRecovered = req.totalRecovered;
    let seriousCritical = req.seriousCritical;
    let lastFetch = req.lastFetch;

    this.name = name;
    this.isoA2 = isoA2;
    this.isoA3 = isoA3;
    this.totalCases = totalCases;
    this.newCases = newCases;
    this.activeCases = activeCases;
    this.totalDeaths = totalDeaths;
    this.newDeaths = newDeaths;
    this.totalRecovered = totalRecovered;
    this.seriousCritical = seriousCritical;
    this.lastFetch = lastFetch;

}

country.methods.updateCountryData = function updateCountryData(req) {

    let name = req.name;
    let isoA2 = req.isoA2;
    let isoA3 = req.isoA3;
    let totalCases = req.totalCases;
    let newCases = req.newCases;
    let activeCases = req.activeCases;
    let totalDeaths = req.totalDeaths;
    let newDeaths = req.newDeaths;
    let totalRecovered = req.totalRecovered;
    let seriousCritical = req.seriousCritical;
    let lastFetch = req.lastFetch;

    this.name = name;
    this.isoA2 = isoA2;
    this.isoA3 = isoA3;
    this.totalCases = totalCases;
    this.newCases = newCases;
    this.activeCases = activeCases;
    this.totalDeaths = totalDeaths;
    this.newDeaths = newDeaths;
    this.totalRecovered = totalRecovered;
    this.seriousCritical = seriousCritical;
    this.lastFetch = lastFetch;

}


country.methods.getId = function getId() {

    return this._id;

};




module.exports = mongoose.model('Country', country);