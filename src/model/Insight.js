var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ufMap = require('../utils/states.name.map');


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
        greatestCasesOcurrenceIncrease: {
            uf: this.greatestCasesOcurrenceIncreaseUf,
            stateName: ufMap[this.greatestCasesOcurrenceIncreaseUf],
            increaseRate: this.greatestCasesOcurrenceIncreaseRate
        },
        greatestDeathOcurrenceIncrease: {
            uf: this.greatestDeathOcurrenceIncreaseUf,
            stateName: ufMap[this.greatestDeathOcurrenceIncreaseUf],
            increaseRate: this.greatestDeathOcurrenceIncreaseRate
        },

        greatestMortalityIncrease: {
            uf: this.greatestMortalityIncreaseUf,
            stateName: ufMap[this.greatestMortalityIncreaseUf],
            increaseRate: this.greatestMortalityIncreaseRate
        },

        lowestMortalityIncrease: {
            uf: this.lowestMortalityIncreaseUf,
            stateName: ufMap[this.greatestMortalityIncreaseUf],
            increaseRate: this.lowestMortalityIncreaseRate
        }

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