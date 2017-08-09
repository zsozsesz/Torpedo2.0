var express = require('express');
var router = express.Router();
var user = require('../modules/users');
/* GET home page. */



router.get('/', function(req, res, next) {

    res.render('login');

});

router.post('/log', function(req, res, next) {
    var x = req.body;
    user.nickname=x.input;
    user.szobanev=x.input2;
    var y ={
        nickname: user.nickname,
        roomname: user.szobanev
    };
    user.users.push(y);
    res.render('index',{title:'torpedo'});
});
/*
router.post('/shoot', function(req, res, next) {
    var x = req.body;
    res.send(map.shoot(x));
});*/


module.exports = router;
