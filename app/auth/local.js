var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require("../models/User.js").User;
var init = require('../init.js');

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
    }, function(email, password, done){
    console.log("Checking");
    User.find({email: email}, function(err, user){
        user = user[0];
        console.log(user)
        if(err) throw err;
        console.log("no err");
        if(!user) return done(null, false);
        console.log("user exists");
        if(user.password!==password) return done(null, false);
        console.log("Correct pass");
        return done(null, user);
    });
}));
init();

module.exports = passport;