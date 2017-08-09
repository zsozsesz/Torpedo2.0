var socket = require('socket.io');
var www = require('./www');
var map = require('../modules/map');
var ships = require('../modules/ship');
var user = require('../modules/users');
var io = socket(www);
var tomb = [];
console.log('server is running...');
var x={
    ships:[
        {a:[1,0], b:[3,0]},
        {a:[0,0], b:[0,3]}
    ]
};


   // io.emit('error',{url:'/'});


io.on('connection', function(socket){
    console.log('a user connected');
    try {
        socket.nickname = user.nickname;
        socket.roomname = user.szobanev;

        socket.ready = user.rooms[socket.roomname].nickname.indexOf(socket.nickname);
        console.log(socket.ready);
        socket.map = map.fuggveny(x);
        socket.hajok = ships(x);
        tomb[socket.nickname] = socket;

        user.nickname = null;
        user.roomname = null;

        for (var i in user.rooms) {
            console.log(user.rooms[i]);
        }

        socket.on('disconnect', function () {
            if (socket.nickname != null) {
                if (user.rooms[socket.roomname].user == 2) {
                    for (var i in user.users) {
                        if (user.users[i].nickname != socket.nickname) {
                            name = user.users[i].nickname;
                        }
                    }
                    tomb[name].ready=0;
                    tomb[name].map = map.fuggveny(x);
                    tomb[name].hajok = ships(x);

                    for (var kis in tomb[name].hajok) {

                        console.log(tomb[name].hajok[kis]);
                    }
                }

                delete tomb[socket.nickname];
                user.roomdelete(socket.roomname);
            }
            console.log(socket.nickname + ' disconnected');

        });

        socket.on('shoot', function (data) {
            if (socket.ready == 0) {
                var nev = null;
                for (var i in user.users) {
                    if (user.users[i].nickname != socket.nickname && user.users[i].roomname == socket.roomname) {
                        nev = user.users[i].nickname;
                    }
                }
                if (nev != null) {
                    tomb[nev].map[data.a][data.b].shoot = true;
                    var x = map.shoot(data, tomb[nev].hajok);
                    tomb[socket.nickname].ready = 1;
                    tomb[nev].ready = 0;
                    socket.emit('shootres', x);
                    console.log(nev + " hajoi:");
                    for (var kis in tomb[nev].hajok) {

                        console.log(tomb[nev].hajok[kis]);
                    }
                }
                else {
                    socket.emit('shootres', {hiba: 'Nincs ellenfeled'});
                }
            }
            else {
                socket.emit('shootres', {hiba: 'Nem te jössz'});
            }
        });
    }
    catch(err){
        socket.emit('hiba',{url:'/'});
    }
});