var express = require('express');
var router = express.Router();
var user = require('../modules/users');

router.get('/', function(req, res, next) {
        res.redirect('/');
});

var map={
    ships:[
        {a:[1,0], b:[3,0]},
        {a:[0,0], b:[0,3]}
    ]
};

router.post('/', function(req, res, next) {
    var x = req.body;
    user.nickname=x.input;
    user.szobanev=x.input2;
    var x = user.roompush(user.szobanev,user.nickname);

    if(x==null){
        res.redirect('/');
    }
    else{
        var y ={
            nickname: user.nickname,
            roomname: user.szobanev,
            terkep: map
        };
        user.users[y.nickname]=y;
        res.redirect('/render');
    }
});

module.exports = router;