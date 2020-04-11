var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
        required: false,
        unique: true
    },
    
    data: {},

    latest: {}


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

  
   this.name = name;
   this.uf = uf;
   this.uid = uid;
   this.data = data;
   
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

State.methods.getId = function getId() {
    return this._id;
};

State.methods.getData = function getData() {
    return this.data;
};

State.methods.setData = function setData(newData) {
    this.data[newData.date] = newData;
    this.latest = newData;
};

State.methods.removeKey = function removeKey(key) {
   delete this.data[key];
};



module.exports = mongoose.model('State', State);