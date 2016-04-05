var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

router.post("/", passport.authenticate("local", {
    successRedirect: "/assets/views/viewSearch.html",
    failureRedirect: "/",
    failureFlash: 'Invalid username or password.'
}));

router.get("/*", function(req, res){
  var file = (req.params[0] || "/assets/views/index.html");
  res.sendFile(path.join(__dirname, '../public',file));
});


module.exports = router;
