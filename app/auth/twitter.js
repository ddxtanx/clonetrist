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
    profile = profile._json;
    console.log(profile);
    console.log("In twitter.js");
    var userData = {
          username: profile.screen_name,
          email: profile.email||"",
          id: profile.id,
          password: "",
          type:"twitter"
    }
    console.log(userData);
    User.find({
      id: profile.id,
      type: "twitter"
    }, function(err, users){
      if(err) throw err;
      if(users.length==0){
          console.log("creating");
        User.create(userData, function(err, data){
          if(err) throw err;
          console.log("User created "+data);
          return done(err, data)
        });
      } else{
        console.log("finding");
        return done(err, users[0]);
      }
    });
  }
));

// serialize user into the session
init();


module.exports = passport;