function add(){
    function parseArg(n){
        if (Array.isArray(n)) return add.apply(this, n);
        if (typeof n === 'function') return parseArg(n());
        return isNaN(n) ? 0 : parseInt(n,10);
    }
    var result = 0;
    for(var index = 0, count = arguments.length; index < count; index++)
        result += parseArg(arguments[index]);
    return result;
}