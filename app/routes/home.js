var express = require('express');
var router = express.Router();

var user = [];
var restaurant = [
    {name:"mcDo", img:["https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-1.jpg"]},
    {name:"OTacos", img:["https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-2.jpg"]},
    {name:"Cacao", img:["https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-3.jpg"]}
];

var database = require('../database.js').getDatabase();

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.userId == null){
        res.render('unregistered_home');
    } else{
        res.render('home', { title: 'Home', restaurants:restaurant});
    }
});

router.post('/signup', function (req, res, next) {

    if(req.body.signupPassword != req.body.signupPassword2){
        res.render('unregistered_home', { signupFailed:true });
        return;
    }

    if(database.getUserByName(req.body.signupName) != null){
        res.render('unregistered_home', { signupFailed:true });
        return;
    }else{
        database.addNewUser(req.body.signupName, req.body.signupPassword);
        res.json(database.users);
    }
});

router.get('/signin', function (req, res, next) {
    if(req.session.userId == null)
        res.render('signin');
    else
        res.redirect("/");
});

router.post('/signin', function (req, res, next) {
    if(req.session.userId == null){
        var user = database.getUserByName(req.body.signinName);
        if(user != null){
            if(user.infoUser.password == req.body.signinPassword){
                req.session.userId = user.id;
                res.redirect('/home');
                return;
            }
        }
        res.render('unregistered_home', {signinFailed:true});
    }else
        res.redirect('/home');
});

module.exports = router;
