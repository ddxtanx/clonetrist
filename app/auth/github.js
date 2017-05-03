var passport = require("passport");
var GithubStrategy = require("passport-github2").Strategy;
var User = require("../models/User.js").User;
var init = require('../init');
var config = require("./config.js");
console.log(config.github)
passport.use(new GithubStrategy({
    clientID: config.github.clientId,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callback
  },
    function(accessToken, refreshToken, profile, done){
      profile = profile._json;
      var userData = {
        username: profile.login,
        email: profile.email,
        id: profile.id,
        password: "",
        type: "github"
      };
      console.log("In github.js");
    User.find({
      id: profile.id,
      type: "github"
    }, function(err, users){
      if(err) throw err;
      if(users.length==0){
        User.create(userData, function(err, data){
          if(err) throw err;
          console.log("User created "+data);
          return done(err, data);
        });
      } else{
        return done(err, users[0]);
      }
    })
    }
));
init();
module.exports = passport;