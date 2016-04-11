var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
// var Wine = require('../models/newWine.js');
var User = require("../models/user");

router.get("/getWineDatabase/:id", function(req, res){
    var id = req.user._id;
    console.log("ID in the get route is: ", req.user._id);

    User.findById(id, function(err, data){
        if(err) {
          console.log(err);
        }
        res.send(data);
    });
});

router.put("/addWineToCellar/:id", function(req, res){
  console.log("Information being sent to the server is: ",req.body);
  var id = req.body.data._id;
  //console.log("User Id that will be update: ", id);
  if(!req.body) {
      return res.send(400);
  }
  User.findById(id, function(e,data){
      if(e) {
          return res.send(500, e);
      }
      if(!data) {
          return res.send(404);
      }
      var update = {
          winelist: req.body.data.winelist
        // varietal: req.body.winelist.varietal,
        // vintage: req.body.winelist.vintage,
        // appelation: req.body.winelist.appelation,
        // region: req.body.winelist.region,
        // imgurl: req.body.winelist.imgurl,
        // wineryinfo: req.body.winelist.wineryinfo,
        // cost: req.body.winelist.cost,
        // price: req.body.winelist.price,
        // inventory: req.body.winelist.inventory,
        // tastingnotes: req.body.winelist.tastingnotes
      };
      console.log("information on variable update: ", update);
      User.findByIdAndUpdate(id, update, function(err){
          if(err) {
              return res.send(500, err);
          }
      });
  });
  console.log("Made it to here");
});


// router.post("/addWineManually", function(req, res){
//     var newWine = new Wine ({
//         "name": req.body.name,
//         "varietal": req.body.varietal,
//         "vintage" : req.body.vintage,
//         "appelation": req.body.appelation,
//         "region": req.body.region,
//         "imgurl": req.body.imgurl,
//         "wineryinfo": req.body.wineryinfo,
//         "cost": req.body.cost,
//         "price": req.body.price,
//         "inventory": req.body.inventory,
//         "tastingnotes": req.body.tastingnotes
//     });
//     newWine.save(function(err, data){
//         if(err){
//           console.log(err);
//         }
//         res.send(data);
//     });
// });

router.delete("/wine/:id", function(req,res){
  Wine.findByIdAndRemove(req.params.id, function(err,Wine){
    if(err){
      console.log(err);
    }
    res.send(Wine);
  });
});

router.put('/updateWine:id', function(req, res) {

    var id = req.body._id;

    if(!req.body) {
        return res.send(400);
    }
    User.findById(id, function(e,data){
        if(e) {
            return res.send(500, e);
        }
        if(!data) {
            return res.send(404);
        }
        var update = {
          name: req.body.name,
          varietal: req.body.varietal,
          vintage: req.body.vintage,
          appelation: req.body.appelation,
          region: req.body.region,
          imgurl: req.body.imgurl,
          wineryinfo: req.body.wineryinfo,
          cost: req.body.cost,
          price: req.body.price,
          inventory: req.body.inventory,
          tastingnotes: req.body.tastingnotes
        };
        User.findByIdAndUpdate(id, update, function(err){
            if(err) {
                return res.send(500, err);
            }
        });
    });
    console.log("Made it to here");
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/assets/views/index.html#/home",
    failureRedirect: "/",
    failureFlash: true
}));
router.get("/users", function(req,res,next){
    res.sendFile(path.resolve(__dirname, "../public/assets/views/users.html"));
});

router.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();

});

router.get("/*", function(req, res){
  var file = (req.params[0] || "/assets/views/login.html");
  res.sendFile(path.join(__dirname, '../public',file));
});

module.exports = router;
