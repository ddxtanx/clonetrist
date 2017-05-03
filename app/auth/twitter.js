var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/User').User;
var init = require('../init');

passport.use(new TwitterStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: "https://clonetrist-ddxtanx.herokuapp.com/auth/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("In twitter.js");
    var searchQuery = {
      username: profile.displayName
    };

    var updates = {
      username: profile.displayName,
    };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
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