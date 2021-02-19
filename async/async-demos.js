(function(){
    //Sync
    function addSync(x,y){
        console.log(`   [@service] processing ${x} and ${y}`);
        var result = x + y;
        console.log(`   [@service] return result`);
        return result;
    }

    function addSyncClient(x,y){
        console.log(`[@client] triggering the service`);
        var result = addSync(x,y);
        console.log(`[@client] result = ${result}`);
    }

    globalThis['addSyncClient'] = addSyncClient;

    //Async
    function addAsync(x,y, callback){
        console.log(`   [@service] processing ${x} and ${y}`);
        setTimeout(function(){ 
            var result = x + y;
            console.log(`   [@service] return result`);
            callback(result);
        }, 5000);
    }

    function addAsyncClient(x,y){
        console.log(`[@client] triggering the service`);
        addAsync(x,y, function(result){
            console.log(`[@client] result = ${result}`);
        });
    }

    globalThis['addAsyncClient'] = addAsyncClient;

})();