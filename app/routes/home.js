var express = require('express');
var router = express.Router();

var user = [];
var restaurant = [
    {name:"mcDo", img:["https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-1.jpg"]},
    {name:"OTacos", img:["https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-2.jpg"]},
    {name:"Cacao", img:["https://wallpapers.wallhaven.cc/wallpapers/thumb/small/th-3.jpg"]}
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', { title: 'Home', restaurants:restaurant});
});

router.post('/account-creation', function (req, res, next) {
    var found = false;
    for(var i=0; i<user.length; i++){
        if(user[i].username == req.body.user){
            found = true;
            break;
        }
    }
    if(found){
        res.render('signin', { title: 'ERROR' });
    }else{
        user.push({username:req.body.user, password:req.body.password});
        res.json(user);
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
        var found = false;
        for(var i=0; i<user.length; i++){
            if(user[i].username == req.body.user){
                if(user[i].password == req.body.password){
            req.session.userId = user[i].username;
                    res.render('index', {title:req.session.userId});
                    found = true;
                    break;
                } else{
                    break;
                }
            }
        }
        if(!found) res.render('signin');
        
    } else{
        res.redirect('/');
    }
});

module.exports = router;
