var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User').User;
var init = require('../init');
var config = require("./config.js");
passport.use(new TwitterStrategy({
    consumerKey: config.twitter.CONSUMER_KEY,
    consumerSecret: config.twitter.CONSUMER_SECRET,
    callbackURL: config.twitter.callback
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("In twitter.js");
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
        }, function(err, data){
          if(err) throw err;
          console.log("User created "+data);
          return data
        });
      } else{
        
      }
    });
  }
));

// serialize user into the session
init();


module.exports = passport;