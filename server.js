var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    sessions = require('client-sessions'),
    account = require("./app/account.js"),
    morgan = require('morgan'),
    twitterAuth = require("./app/auth/twitter.js");
app.set("views", "./public");
app.use(express.static("./public"), bodyParser(), sessions({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
}), morgan('combined'));
function checkIn(req, res, callback){
    if(!req.session.active){
        console.log("Catching request to login only area");
        res.redirect("/login");
        res.end();
    }else{
        callback(req, res);
    }
}
app.get("/*", function(req, res, next){
   if(req.session.active==undefined){
       req.session.destroy();
       req.session.active = false;
   }
   next();
});
app.get("/", function(req, res){
    res.render("twig/index.twig", {loggedin: req.session.active, name:req.session.name});
});
app.get("/", function(req, res){
    res.render('twig/index.twig', {loggedin: req.session.active, name: req.session.name});
});
app.get("/register", function(req, res){
    res.render("twig/register.twig", {loggedin: req.session.active, name: req.session.name});
});
app.get("/login", function(req, res){
    res.render("twig/login.twig", {loggedin: req.session.active, name: req.session.name});
});
app.post("/register", function(req, res){
    account.reg(req, res);
});
app.post("/login", function(req, res){
    account.login(req, res);
});
app.get("/auth/login", twitterAuth.authenticate("twitter"));
app.get("/auth/callback", function(req, res){
    console.log("callback");
    twitterAuth.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
        res.end();
    };
});
app.get("/logout", function(req, res){
    req.session.destroy();
    req.session.active = false;
    res.redirect("/");
    res.end();
});
app.listen(process.env.PORT || 8080);
