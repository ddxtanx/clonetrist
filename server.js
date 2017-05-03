var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    sessions = require('client-sessions'),
    account = require("./app/account.js"),
    twitterAuth = require("./app/auth/twitter.js"),
    passport = require('passport'),
    githubAuth = require("./app/auth/github.js");
app.set("views", "./public");
app.use(express.static("./public"), bodyParser(), sessions({
  cookieName: 'session',
  secret: process.env.SESSION_SECRET,
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
}));
app.use(passport.initialize());
app.use(passport.session());
function getNameData(req, res){
    if(req.user==undefined){
        return {loggedin: req.session.active, name:""};
    } else{
        return {loggedin:req.session.active, name:req.user[0].username};
    }
}
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
    console.log(req.user);
   if(req.session.active==undefined){
       req.session.destroy();
       req.session.active = false;
   }
   next();
});
app.get("/", function(req, res){
    res.render("twig/index.twig", getNameData(req, res));
});
app.get("/", function(req, res){
    res.render('twig/index.twig', getNameData(req, res));
});
app.get("/register", function(req, res){
    res.render("twig/register.twig", getNameData(req, res));
});
app.get("/login", function(req, res){
    res.render("twig/login.twig", getNameData(req, res));
});
app.post("/register", function(req, res){
    account.reg(req, res);
});
app.post("/login", function(req, res){
    account.login(req, res);
});
app.get("/auth/twitter/login", twitterAuth.authenticate("twitter"));
app.get('/auth/twitter/callback',
  twitterAuth.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
    req.session.active = true;
    res.redirect("/");
    res.end();
});
app.get("/auth/github/login", githubAuth.authenticate("github"));
app.get("/auth/github/callback", githubAuth.authenticate("github"), function(req,res){
    req.session.active = true;
    res.redirect("/");
    res.end();
})
app.get("/logout", function(req, res){
    req.session.destroy();
    req.session.active = false;
    req.user = {};
    res.redirect("/");
    res.end();
});
app.listen(process.env.PORT || 8080);
