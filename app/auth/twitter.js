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
    var searchQuery = {
      id: profile.id
    };

    var updates = {
      username: profile.displayName,
      email: profile.email,
      id: profile.id
    };

    // update the user if s/he exists or add a new user
    User.findOrCreate(searchQuery, updates, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


module.exports = passport;