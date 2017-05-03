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
      console.log(profile)
      console.log("In github.js");
    // update the user if s/he exists or add a new user
    User.find({
      id: profile.id
    }, function(err, users){
      if(err) throw err;
      if(users.length==0){
        User.create({
          username: profile.login,
          email: profile.email,
          id: profile.id,
          type:"github"
        });
      } else{
        
      }
    })
    }
));
init();
module.exports = passport;