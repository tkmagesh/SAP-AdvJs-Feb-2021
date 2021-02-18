
function add(x,y){
    return x + y;
}

-> pure function

add(10,20) => 30


var z = 100;
function add(x,y){
    return x + y + z;
}

add(10,20) => 130

z = 1000;

add(10,20) => 1030

var add = (function(){
    var cache = {};
    return function(x,y){
        var key = JSON.stringify(arguments);
        if (!cache.hasOwnProperty(key)){
            console.log('processing ', x , ' and ', y);
            cache[key] = x + y;
        }
        return cache[key]
    }
})();

/* 
Write a function 'memoize' using which one can create a memoized version of ANY function with ANY number of arguments 
*/

//solutio
function memoize(fn){
    var cache = {};
    return function(){
        var key = JSON.stringify(arguments);
        if (!cache.hasOwnProperty(key)){
            cache[key] = fn.apply(this, arguments);
        }
        return cache[key]
    }
}

function subtract(x,y){
    console.log('processing ', x , ' and ', y);
    return x + y;
}

function multiply(x,y){
    console.log('processing ', x , ' and ', y);
    return x * y;
}

function isPrime(n){
    console.log('processing ', n);
    if (n <= 2) return true;
    for(var index = 2; index <= (n/2); index++)
        if (n % 2 === 0) return false;
    return true;
}

function add(x,y,z){
    console.log('processing ', x , y, z);
    return x + y + z;
}