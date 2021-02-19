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

    function addAsyncPromise(x,y){
        console.log(`   [@service] processing ${x} and ${y}`);
        var p = new Promise(function(resolveFn, rejectFn){
            setTimeout(function(){ 
                var result = x + y;
                console.log(`   [@service] return result`);
                resolveFn(result);
            }, 5000);
        });
        return p;
    }

    globalThis['addAsyncPromise'] = addAsyncPromise;
    /* 
    function addAsyncPromiseClient(x,y){
        console.log(`[@client] triggering the service`);
        var p = addAsyncPromise(x,y);
        p.then(function(result){ 
            console.log(`[@client] result = ${result}`);
        });
    } 
    */

    async function addAsyncPromiseClient(x,y){
        console.log(`[@client] triggering the service`);
        var result = await addAsyncPromise(x,y);
        console.log(`[@client] result = ${result}`);
        var result2 = await addAsyncPromise(300,500);
        console.log(`[@client] result2 = ${result2}`);
    }

    globalThis['addAsyncPromiseClient'] = addAsyncPromiseClient;

    function divideAsyncPromise(x,y){
        console.log(`   [@service] processing ${x} and ${y}`);
        var p = new Promise(function(resolveFn, rejectFn){
            setTimeout(function(){ 
                if (y === 0){
                    return rejectFn(new Error('Invalid arguments!'));
                }
                var result = x / y;
                console.log(`   [@service] return result`);
                resolveFn(result);
            }, 7000);
        });
        return p;
    }

    globalThis['divideAsyncPromise'] = divideAsyncPromise;

})();

//using allSettled
var x = 100, y = 0;
var p1 = addAsyncPromise(x,y);
var p2 = divideAsyncPromise(x,y);
Promise.allSettled([p1, p2])
    .then(([addResult, divideResult]) => console.log(addResult, divideResult));



