var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Utils = require('../utils/utils');
const sortByDate = Utils.sortByDate;


var State = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    uf: {
        type: String,
        required: true,
        unique: true
    },

    uid: {
        type: Number,
        required: false
    },

    data: {
        type: Object,
        required: true
    },

    latest: {
        type: Object,
        required: true
    }


}, { autoIndex: true, });




/**
 * 
 * @constructor 
 * 
 */

State.methods.createState = function createState(req) {


    let name = req.name;
    let uf = req.uf;
    let uid = req.uid;
    let data = req.data;
    let latest = req.latest;

    this.name = name;
    this.uf = uf;
    this.uid = uid;
    this.data = data;
    this.latest = latest;
    if (uid) this.uid = uid;

}

State.methods.getInfo = function getInfo() {
    return {
        name: this.name,
        uf: this.uf,
        uid: this.uid,
        data: this.data,
        latest: this.latest,
        id: this._id
    }
}


State.methods.getLastData = function getInfo() {
    return {
        name: this.name,
        uf: this.uf,
        latest: this.latest,
    }
}


State.methods.getTimeseries = function getTimeSeries() {

    let data = Object.values(this.data);

    return {
        name: this.name,
        uf: this.uf,
        data: data.sort(sortByDate('date', false)),
        latest: this.latest
    }
}

State.methods.updateData = function updateData(newData) {
    this.data[newData.date] = newData;
    this.latest = newData;
};

State.methods.removeKey = function removeKey(key) {
    delete this.data[key];
};



module.exports = mongoose.model('State', State);