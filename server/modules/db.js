var mongoose = require('mongoose');
var MongoURI = "mongodb://localhost/winePad_collection";
var MongoDB = mongoose.connect(MongoURI).connection;

MongoDB.on("error", function(err){
  console.log("There was an error with Mongo");
});

MongoDB.once("open", function(){
  console.log("MongoDB Up and Running");
});

module.exports = MongoDB;
