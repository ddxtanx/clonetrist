var User = require("./models/User.js").User;
function logData(req, res){
    return {loggedin: req.session.active, name:req.session.name};
}
function reg(req, res){
    var email = req.body.email;
    var name = req.body.name;
    var pass1 = req.body.pass1;
    var pass2  = req.body.pass2;
    if(pass1!==pass2){
        res.render("twig/register.twig", Object.assign({},{type: "alert-danger", text:"Passwords do not match"}, logData(req, res)));
    }
    console.log("password verified");
    User.find({
        email: email
    }, function(err, users){
        console.log(users);
        if(err) throw err;
        if(users.length!==0){
            res.render("twig/register.twig", Object.assign({},{type: "alert-danger", text:"A user with that email has already registered"}, logData(req, res)));
        }
        var user = new User({username: name, email: email, password: pass1});
        console.log("user created");
        user.save(function(err, data){
            if(err) throw err;
            console.log("user saved");
            console.log(data);
            res.render("twig/register.twig", Object.assign({},{type: "alert-success", text:"Registration completed!"}, logData(req, res)));
        }); 
    });
}
function login(req, res){
    var email = req.body.email;
    var password = req.body.password;
    User.find({
        email:email,
        password: password
    }, function(err, users){
        if(err) throw err;
        if(users.length==0){
            res.render("twig/login.twig", Object.assign({},{type: "alert-danger", text:"Email&Password combination not found..."}, logData(req, res)));
        } else{
            var user = users[0];
            req.session.active = true;
            req.session.email = user.email;
            req.session.name = user.username;
            res.render("twig/login.twig", Object.assign({},{type: "alert-success", text: "You have been successfully logged in!"}, logData(req, res)));
        }
    });
}
module.exports.reg = reg;
module.exports.login = login;