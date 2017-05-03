var passport = require('passport'),
    TStrategy = require('passport-twitter').Strategy,
    User = require("../models/User.js").User,
    init = require("../init.js");
passport.use(new TStrategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: '/auth/callback'
  },
  function(token, tokenSecret, profile, done) {
    console.log("infunc");
    var search = {
        name: profile.displayName
    };
    var updates = {
      name: profile.displayName,
      someID: profile.id
    };

    var options = {
      upsert: true
    };
    
    User.findOneAndUpdate(search, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
}));
init();
module.exports = passport;