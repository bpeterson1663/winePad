var express = require("express");
var router = express.Router();
var passport = require("passport");
var path = require("path");
var User = require("../models/user.js");

router.get("/", function(req, res, next){
  res.sendFile(path.resolve(__dirname, "../public/assets/views/registration.html"));
});

router.post("/", function(req, res, next){
  User.create(req.body, function(err, post){
      if(err){
        next(err);
      } else{
        res.redirect("/");
      }
  });
});


module.exports = router;
