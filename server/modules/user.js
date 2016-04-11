var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req,res,next){
    res.json(req.isAuthenticated());
});

router.get("/name", function(req,res,next){
    var resUser = {
        _id: req.user._id,
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
        datecreated: req.user.lastlogin,
        winelist: req.user.winelist
    };
    res.json(resUser);
});

module.exports = router;
