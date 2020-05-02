var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var insight = new Schema({

    date: {
        type: Date,
        unique: true,
        required: true,
    },

    brazilDoubleCasesDays: {
        type: Number,
        required: true
    },

    greatestCasesOcurrenceIncreaseUf: {
        type: String,
        required: true
    },
    greatestCasesOcurrenceIncreaseRate: {
        type: Number,
        required: true
    },

    greatestDeathOcurrenceIncreaseUf: {
        type: String,
        required: true
    },
    greatestDeathOcurrenceIncreaseRate: {
        type: Number,
        required: true
    },

    greatestMortalityIncreaseUf: {
        type: String,
        required: true
    },
    greatestMortalityIncreaseRate: {
        type: Number,
        required: true
    },

    lowestMortalityIncreaseUf: {
        type: String,
        required: true
    },
    lowestMortalityIncreaseRate: {
        type: Number,
        required: true
    },


}, { autoIndex: true });


insight.methods.getInfo = function getInfo() {
    return {
        date: this.date,
        brazilDoubleCasesDays: this.brazilDoubleCasesDays,
        greatestCasesOcurrenceIncreaseUf: this.greatestCasesOcurrenceIncreaseUf,
        greatestCasesOcurrenceIncreaseRate: this.greatestCasesOcurrenceIncreaseRate,
        greatestDeathOcurrenceIncreaseUf: this.greatestDeathOcurrenceIncreaseUf,
        greatestDeathOcurrenceIncreaseRate: this.greatestDeathOcurrenceIncreaseRate,
        greatestMortalityIncreaseUf: this.greatestMortalityIncreaseUf,
        greatestMortalityIncreaseRate: this.greatestMortalityIncreaseRate,
        lowestMortalityIncreaseUf: this.lowestMortalityIncreaseUf,
        lowestMortalityIncreaseRate: this.lowestMortalityIncreaseRate
    }
}

/**
 * 
 * @constructor 
 * 
 */

insight.methods.createInsight = function createInsight(req) {

    let brazilDoubleCasesDays = req.brazilDoubleCasesDays;
    let greatestCasesOcurrenceIncreaseUf = req.greatestCasesOcurrenceIncreaseUf;
    let greatestCasesOcurrenceIncreaseRate = req.greatestCasesOcurrenceIncreaseRate;
    let greatestDeathOcurrenceIncreaseUf = req.greatestDeathOcurrenceIncreaseUf;
    let greatestDeathOcurrenceIncreaseRate = req.greatestDeathOcurrenceIncreaseRate;
    let greatestMortalityIncreaseUf = req.greatestMortalityIncreaseUf;
    let greatestMortalityIncreaseRate = req.greatestMortalityIncreaseRate;
    let lowestMortalityIncreaseUf = req.lowestMortalityIncreaseUf;
    let lowestMortalityIncreaseRate = req.lowestMortalityIncreaseRate;
    let date = req.date;

    this.brazilDoubleCasesDays = brazilDoubleCasesDays;
    this.greatestCasesOcurrenceIncreaseUf = greatestCasesOcurrenceIncreaseUf;
    this.greatestCasesOcurrenceIncreaseRate = greatestCasesOcurrenceIncreaseRate;
    this.greatestDeathOcurrenceIncreaseUf = greatestDeathOcurrenceIncreaseUf;
    this.greatestDeathOcurrenceIncreaseRate = greatestDeathOcurrenceIncreaseRate;
    this.greatestMortalityIncreaseUf = greatestMortalityIncreaseUf;
    this.greatestMortalityIncreaseRate = greatestMortalityIncreaseRate;
    this.lowestMortalityIncreaseUf = lowestMortalityIncreaseUf;
    this.lowestMortalityIncreaseRate = lowestMortalityIncreaseRate;
    this.date = date;


}


module.exports = mongoose.model('Insight', insight);