var mongoose = require('mongoose');
var MongoURI = "mongodb://<user>:<password>@candidate.40.mongolayer.com:11147,candidate.60.mongolayer.com:10885/app49546176";
var MongoDB = mongoose.connect(MongoURI).connection;

MongoDB.on("error", function(err){
  console.log("There was an error with Mongo");
});

MongoDB.once("open", function(){
  console.log("MongoDB Up and Running");
});

module.exports = MongoDB;
