var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var test = new Schema({

    uf: {
        type: String,
        required: true,
        unique: true
    },

    latest: {
        type: Object,
        required: true
    },

    data: {
        type: Object,
        required: true
    }


}, { autoIndex: true });


test.methods.getInfo = function getInfo() {
    return {
        uf: this.uf,
        latest: this.latest,
        data: this.data
    }
}

/**
 * 
 * @constructor 
 * 
 */

test.methods.createTest = function createTest(req) {

    this.uf = req.uf;
    this.latest = req.latest;
    this.data = req.data;

}

test.methods.setData = function setData(newData) {
    this.data[newData.date] = newData;
    this.latest = newData;
};






module.exports = mongoose.model('Test', test);