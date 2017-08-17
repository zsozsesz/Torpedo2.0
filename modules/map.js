function shipmezo() {
    return{
        ship : false,
        shoot : false
    }
}


module.exports.fuggveny = function (x) {

    var terkep = new Array(10);

    for(var y=0;y<10;y++){
       terkep[y]=new Array(10);
    }
    for(var i =0;i<10;i++){
        for(var y =0;y<10;y++){
            terkep[i][y]=shipmezo();
        }
    }

    for(var c in x.ships){
        for(var i= x.ships[c].a[0];i<=x.ships[c].b[0];i++){
            for( var y=x.ships[c].a[1];y<=x.ships[c].b[1];y++){
                terkep[i][y].ship=true;
            }
        }
    }
    return terkep;
};

module.exports.shoot = function (loves,hajok) {
    for(var i in hajok){
        for(var y in hajok[i]){
            if(loves.a==hajok[i][y].a && loves.b==hajok[i][y].b ){
                hajok[i][y].shoot=true;
                hajok[i][hajok[i].length-1].life--;

               if(hajok[i][hajok[i].length-1].life==0)
               {
                   return {
                       talalat: true,
                       sink:true
                   }
               }
               else{
                   return {
                       talalat: true,
                       sink:false
                   }
               }
            }
        }
    }
    return {
        talalat: false,
        sink:false
    }
}

module.exports.gameend=function (hajok) {
    for(var i in hajok){
        if(hajok[i][hajok[i].length-1].life!=0){
            return {
                end : false
            }
        }
    }
    return{
        end:true
    }

}