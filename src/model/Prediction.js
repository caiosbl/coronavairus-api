var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var prediction = new Schema({

    date: {
        type: Date,
        required: true,
        unique: true
    },
    casesLowPrediction: {
        type: Number,
        required: true,
        unique: true
    },
    casesMeanPrediction: {
        type: Number,
        required: true,
        unique: true
    },
    casesHighPrediction: {
        type: Number,
        required: true,
        unique: true
    },

    deathsLowPrediction: {
        type: Number,
        required: true,
        unique: true
    },

    deathsMeanPrediction: {
        type: Number,
        required: true,
        unique: true
    },

    deathsHighPrediction: {
        type: Number,
        required: true,
        unique: true
    },




}, { autoIndex: true });


prediction.methods.getInfo = function getInfo() {
    return {
        date: this.date,

        cases: {
            casesLowPrediction: this.casesLowPrediction,
            casesMeanPrediction: this.casesMeanPrediction,
            casesHighPrediction: this.casesHighPrediction
        },

        deaths: {
            deathsLowPrediction: this.deathsLowPrediction,
            deathsMeanPrediction: this.deathsMeanPrediction,
            deathsHighPrediction: this.deathsHighPrediction
        }
    }
}

/**
 * 
 * @constructor 
 * 
 */

prediction.methods.createPrediction = function createPrediction(req) {

    let casesLowPrediction = req.casesLowPrediction;
    let casesMeanPrediction = req.casesMeanPrediction;
    let casesHighPrediction = req.casesHighPrediction;
    let deathsLowPrediction = req.deathsLowPrediction;
    let deathsMeanPrediction = req.deathsMeanPrediction;
    let deathsHighPrediction = req.deathsHighPrediction;
    let date = req.date;

    this.casesLowPrediction = casesLowPrediction;
    this.casesMeanPrediction = casesMeanPrediction;
    this.casesHighPrediction = casesHighPrediction;
    this.deathsLowPrediction = deathsLowPrediction;
    this.deathsMeanPrediction = deathsMeanPrediction;
    this.deathsHighPrediction = deathsHighPrediction;
    this.date = date;

}

prediction.methods.updatePrediction = function updatePrediction(req) {

    let casesLowPrediction = req.casesLowPrediction;
    let casesMeanPrediction = req.casesMeanPrediction;
    let casesHighPrediction = req.casesHighPrediction;
    let deathsLowPrediction = req.deathsLowPrediction;
    let deathsMeanPrediction = req.deathsMeanPrediction;
    let deathsHighPrediction = req.deathsHighPrediction;
    let date = req.date;

    this.casesLowPrediction = casesLowPrediction;
    this.casesMeanPrediction = casesMeanPrediction;
    this.casesHighPrediction = casesHighPrediction;
    this.deathsLowPrediction = deathsLowPrediction;
    this.deathsMeanPrediction = deathsMeanPrediction;
    this.deathsHighPrediction = deathsHighPrediction;
    this.date = date;

}


prediction.methods.getId = function getId() {

    return this._id;

};




module.exports = mongoose.model('Prediction', prediction);