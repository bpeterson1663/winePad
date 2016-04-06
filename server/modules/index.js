var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var Wine = require('../models/newWine.js');

router.get("/getWineDatabase", function(req, res){
  Wine.find({}, function(err, data){
      if(err) {
        console.log(err);
      }
      res.send(data);
  });
});

router.post("/addWineToCellar", function(req, res){
  var newWine = new Wine ({
      "name": req.body.Name,
      "varietal": req.body.Varietal.Name,
      "appelation": req.body.Appellation.Name,
      "region": req.body.Appellation.Region.Name,
      "imgurl": req.body.Labels[0].Url,
      "wineryinfo": req.body.Vineyard.Url,
      "cost": req.body.cost,
      "price": req.body.price,
      "inventory": req.body.inventory,
      "tastingnotes": req.body.Community.Url
  });


  newWine.save(function(err, data){
      if(err){
        console.log(err);
      }
      res.send(data);
  });
});


router.post("/addWineManually", function(req, res){
    var newWine = new Wine ({
        "name": req.body.name,
        "varietal": req.body.varietal,
        "appelation": req.body.appelation,
        "region": req.body.region,
        "imgurl": req.body.imgurl,
        "wineryinfo": req.body.vineryinfo,
        "cost": req.body.cost,
        "price": req.body.price,
        "inventory": req.body.inventory,
        "tastingnotes": req.body.tastingnotes
    });
    newWine.save(function(err, data){
        if(err){
          console.log(err);
        }
        res.send(data);
    });
});

router.delete("/wine/:id", function(req,res){
  Wine.findByIdAndRemove(req.params.id, function(err,Wine){
    if(err){
      console.log(err);
    }
    res.send(Wine);
  });
});

router.post("/", passport.authenticate("local", {
    successRedirect: "/assets/views/index.html#/home",
    failureRedirect: "/",
}));

router.get("/*", function(req, res){
  var file = (req.params[0] || "/assets/views/login.html");
  res.sendFile(path.join(__dirname, '../public',file));
});

module.exports = router;
