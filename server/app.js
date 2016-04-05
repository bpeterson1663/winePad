var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./modules/index.js');
var db = require('./modules/db.js');

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/*", function(req, res){
  var file = (req.params[0] || "views/index.html");
  res.sendFile(path.join(__dirname, '/public',file));
});

app.listen(app.get("port"),function(req, res){
  console.log("Listening on Port: ", app.get("port"));
});

module.exports = app;
