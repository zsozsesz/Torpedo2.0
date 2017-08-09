var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.cookies);
    if(req.cookies.name) {
        res.send('még megvan');
    }
    else{
        res.send('már nincs');
    }
});
router.post('/',function (req,res,next) {
    console.log(req.body.message);
    res.cookie('name',req.body.message,{maxAge:30000});
    res.send(req.session.username);
});

module.exports = router;
