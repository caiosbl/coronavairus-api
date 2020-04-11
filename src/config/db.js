const mongoose = require('mongoose');
const BD_URI = process.env.BD_URI;

const BD_PARAMS = {
   "useNewUrlParser": true,
   "useCreateIndex": true,
   "useUnifiedTopology": true
}

mongoose.connect(
   BD_URI,
   BD_PARAMS,
   (err) => {
      if (!err) {
         console.log('MongoDB connection succeeded.'); }
      else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
   }
);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = mongoose.connection;
