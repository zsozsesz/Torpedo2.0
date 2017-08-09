module.exports=function (x) {
    var hajok=[];

    for(var c in x.ships){
        var hajo=[];
        for(var i= x.ships[c].a[0];i<=x.ships[c].b[0];i++){
            for( var y=x.ships[c].a[1];y<=x.ships[c].b[1];y++){
                var kord={
                    a:i,
                    b:y,
                    shoot:false
                };
                hajo.push(kord);
            }
        }
        var life=0;
        for(var k in hajo){
            life++;
        }
        hajo.push({life:life});
        hajok.push(hajo);
    }

    return hajok;
}