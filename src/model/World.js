var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var world = new Schema({

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
    date: {
        type: Date,
        required: true,
        unique: true
    }


}, { autoIndex: true });


world.methods.getInfo = function getInfo() {
    return {
        totalCases: this.totalCases,
        newCases: this.newCases,
        activeCases: this.activeCases,
        totalDeaths: this.totalDeaths,
        newDeaths: this.newDeaths,
        totalRecovered: this.totalRecovered,
        seriousCritical: this.seriousCritical,
        date: this.date
    }
}

/**
 * 
 * @constructor 
 * 
 */

world.methods.createWorldData = function createWorldData(req) {

    let totalCases = req.totalCases;
    let newCases = req.newCases;
    let activeCases = req.activeCases;
    let totalDeaths = req.totalDeaths;
    let newDeaths = req.newDeaths;
    let totalRecovered = req.totalRecovered;
    let seriousCritical = req.seriousCritical;
    let date = req.date;


    this.totalCases = totalCases;
    this.newCases = newCases;
    this.activeCases = activeCases;
    this.totalDeaths = totalDeaths;
    this.newDeaths = newDeaths;
    this.totalRecovered = totalRecovered;
    this.seriousCritical = seriousCritical;
    this.date = date;

}

world.methods.updateWorldData = function updateWorldData(req) {

    let totalCases = req.totalCases;
    let newCases = req.newCases;
    let activeCases = req.activeCases;
    let totalDeaths = req.totalDeaths;
    let newDeaths = req.newDeaths;
    let totalRecovered = req.totalRecovered;
    let seriousCritical = req.seriousCritical;
    let date = req.date;


    this.totalCases = totalCases;
    this.newCases = newCases;
    this.activeCases = activeCases;
    this.totalDeaths = totalDeaths;
    this.newDeaths = newDeaths;
    this.totalRecovered = totalRecovered;
    this.seriousCritical = seriousCritical;
    this.date = date;

}


world.methods.getId = function getId() {

    return this._id;

};




module.exports = mongoose.model('World', world);