var express = require('express');
var router = express.Router();
var user = require('../modules/users');

router.get('/', function(req, res, next) {
    if(user.nickname)
    {
        res.render('index', {title: 'Torpedo'});
    }
    else{
        res.render('login', {err: 'Hiba'});
    }
});

module.exports = router;