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
      User.findOrCreate({
          githubId: profile.id
      }, function(err, user){
          if(err) throw err;
          console.log(user);
      });
    }
));
init();
module.exports = passport;