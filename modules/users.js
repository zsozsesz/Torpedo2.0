var users=[];
var rooms=[];
var nickname=null;
var szobanev=null;
module.exports.users=users;
module.exports.rooms=rooms;
module.exports.nickname=nickname;
module.exports.szobanev=szobanev;
module.exports.roompush=function (room) {

        for (var i in rooms) {
            if (rooms[i].roomname == room && rooms[i].user == 2) {
                return null;
            }
        }
        for (var i in rooms) {
            if (rooms[i].roomname == room && rooms[i].user == 1) {
                rooms[i].user++;
                return 1;
            }
        }
        var x = {
            roomname: room,
            user: 1
        };
        rooms[x.roomname] = x;
        return 1;

};
module.exports.roomdelete=function (room) {
       if(rooms[room]) {
           if (rooms[room].user == 2) {
               rooms[room].user--;
           }
           if (rooms[room].user == 1) {
               rooms[room].user--;
               delete rooms[room];
           }
           return 1;
       }
};