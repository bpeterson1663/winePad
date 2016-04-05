var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//PASPORT
var passport = require("passport");
var session = require("express-session");
var localStrategy = require("passport-local");
var flash = require('connect-flash');
//MODELS
var User = require("./models/user.js");

//MODULES
var db = require("./modules/db.js");
var index = require("./modules/index.js");
var register = require("./modules/register.js");
var user = require("./modules/user.js");




app.use(session({
    secret: "secret",
    key: "user",
    resave: true,
    s: false,
    cookie: {maxAge: 60000, secure: false}
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash({unsafe: true}));
app.use(passport.initialize());
app.use(passport.session());

//PASSPORT SESSION
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      if(err) done(err);
      done(null, user);
  });
});

passport.use("local", new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
  }, function(req, username, password, done){
    User.findOne({username: username}, function(err,user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: "Incorrect username or password"});
        console.log("Incorrect");
      }

      user.comparePassword(password, function(err, isMatch){
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          } else {
            done(null, false, {message: "Incorrect username or password"});
            console.log("Incorrect");
          }
      });
    });
  }
));

app.use("/", index);
app.use("/register", register);
app.use("/user", user);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"),function(req, res){
  console.log("Listening on Port: ", app.get("port"));
});

module.exports = app;
