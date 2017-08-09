var express = require('express');
var router = express.Router();
var user = require('../modules/users');

router.get('/', function(req, res, next) {
        res.redirect('/');
});


router.post('/', function(req, res, next) {
    var x = req.body;
    user.nickname=x.input;
    user.szobanev=x.input2;
    var x = user.roompush(user.szobanev);

    if(x==null){
        res.redirect('/');
    }
    else{
        var y ={
            nickname: user.nickname,
            roomname: user.szobanev
        };
        user.users.push(y);
        res.redirect('/render');
    }
});

module.exports = router;