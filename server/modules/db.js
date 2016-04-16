var mongoose = require('mongoose');
var MongoURI =   "mongodb://winePadDatabase:Wine3072@ds011311.mlab.com:11311/heroku_d7cmdhsv"
 //process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/winePad_collection';


var MongoDB = mongoose.connect(MongoURI).connection;

MongoDB.on("error", function(err){
  console.log("There was an error with Mongo");
});

MongoDB.once("open", function(){
  console.log("MongoDB Up and Running");
});

module.exports = MongoDB;
