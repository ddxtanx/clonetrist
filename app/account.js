var User = require("./models/User.js").User;
function logData(req, res){
    return {loggedin: req.session.active, name:req.user.username, email: req.user.email};
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
        var user = new User({username: name, email: email, password: pass1, id: Math.round(Math.random()*Math.pow(10, 17)), type:"local"});
        console.log("user created");
        user.save(function(err, data){
            if(err) throw err;
            console.log("user saved "+data);
            res.render("twig/register.twig", Object.assign({},{type: "alert-success", text:"Registration completed!"}, logData(req, res)));
        }); 
    });
}
function changeData(req, res){
    console.log("request");
    var user = req.user;
    var id = user.id;
    var password = req.body.curpass;
    var email = req.body.email;
    var pass1 = req.body.pass1;
    var pass2 = req.body.pass2;
    if(password == user.password){
        console.log("correct password");
        var updateData = {};
        if(email!==""){
            console.log("changing email "+email);
            updateData['email']=email;
        }
        if(pass1!==""&&pass2!==""){
            console.log("passes not empty")
            if(pass1==pass2){
                console.log("changing pass "+pass1);
                updateData['password'] = pass1;
            } else{
                return res.render("twig/settings.twig", Object.assign({}, {type: "alert-danger", message:"Passwords do not match"}, logData(req, res)));
            }
        } else{
            pass1 = user.password;
        }
    }else{
        return res.render("twig/settings.twig", Object.assign({}, {type:"alert-danger", message:"Incorrect Password"}, logData(req, res)));
    }
    console.log("updating");
    console.log([id, password]);
    var update = {};
    update["$set"] = updateData;
    console.log(update);
    User.find({
        email: email
    }, function(err, users){
        if(err) throw err;
        if(users.length==0 || users[0].id==req.user.id){
            User.update({
                id: id,
                password: password
            }, update, function(err, data){
                if(err) throw err;
                console.log(data);
                user.email = email;
                user.password = pass1;
                res.render("twig/settings.twig", Object.assign({}, {type: "alert-success", message:"Successfully Completed"}, logData(req, res)));
            });
        } else{
            res.render("twig/settings.twig", Object.assign({}, {type: "alert-danger", message:"That Email Is Already In Use!", completed:false}, logData(req, res)));
        }
    });
}
module.exports.reg = reg;
module.exports.changeData = changeData;