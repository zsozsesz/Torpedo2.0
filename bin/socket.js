var socket = require('socket.io');
var www = require('./www');
var map = require('../modules/map');
var ships = require('../modules/ship');
var user = require('../modules/users');
var io = socket(www);
var tomb = [];
console.log('server is running...');

io.on('connection', function(socket){
    console.log('a user connected');
    socket.nickname=user.nickname;
    socket.roomname=user.szobanev;

   var x={
        ships:[
            {a:[1,0], b:[3,0]},
            {a:[0,0], b:[0,3]}
        ]
    };
    socket.join(user.szobanev);
    socket.map=map.fuggveny(x);
    socket.hajok=ships(x);
    tomb[socket.nickname]=socket;

    user.nickname=null;
    user.roomname=null;

    socket.on('disconnect', function(){
        delete tomb[socket.nickname];
        console.log('user disconnected');
    });

    socket.on('shoot',function (data) {
        var nev;
        for(var i in user.users)
        {
            if(user.users[i].nickname!=socket.nickname && user.users[i].roomname==socket.roomname){
                nev=user.users[i].nickname;
            }
        }
        tomb[nev].map[data.a][data.b].shoot=true;
        var x =map.shoot(data,tomb[nev].hajok);
        socket.emit('shootres',x);
        console.log(nev+" hajoi:");
        for(var kis in tomb[nev].hajok){

            console.log(tomb[nev].hajok[kis]);
        }
    })
});