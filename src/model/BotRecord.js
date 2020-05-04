var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var botRecord = new Schema({

    statesRecord: {
        type: Date,
        unique: true,
        required: true,
    },
  
}, { autoIndex: true });

/**
 * 
 * @constructor 
 * 
 */

botRecord.methods.createBotRecord = function createBotRecord(req) {
    this.statesRecord = req.statesRecord;
}

botRecord.methods.getInfo = function getInfo() {
   return {statesRecord: this.statesRecord};
}


module.exports = mongoose.model('BotRecord', botRecord);