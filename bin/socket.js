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

io.on('connection', function(socket){
    console.log('a user connected');
    socket.nickname=user.nickname;
    socket.roomname=user.szobanev;


    socket.join(user.szobanev);
    socket.map=map.fuggveny(x);
    socket.hajok=ships(x);
    tomb[socket.nickname]=socket;

    user.nickname=null;
    user.roomname=null;

    socket.on('disconnect', function(){
        var name =null;
        for(var i in user.users){
            if(user.users[i].nickname!=socket.nickname){
                name=user.users[i].nickname;
            }
        }
        tomb[name].map=map.fuggveny(x);
        tomb[name].hajok=ships(x);

        for(var kis in tomb[name].hajok){

            console.log(tomb[name].hajok[kis]);
        }

        delete tomb[socket.nickname];
        user.roomdelete(socket.roomname);
        console.log(socket.nickname+' disconnected');
    });

    socket.on('shoot',function (data) {
        var nev=null;
        for(var i in user.users)
        {
            if(user.users[i].nickname!=socket.nickname && user.users[i].roomname==socket.roomname){
                nev=user.users[i].nickname;
            }
        }
       if(nev!=null){
           tomb[nev].map[data.a][data.b].shoot=true;
           var x =map.shoot(data,tomb[nev].hajok);
           socket.emit('shootres',x);
           console.log(nev+" hajoi:");
           for(var kis in tomb[nev].hajok){

               console.log(tomb[nev].hajok[kis]);
           }
       }
        else{
           socket.emit('shootres',{hiba:'Nincs ellenfeled'});
       }
    })
});