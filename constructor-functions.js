function Employee(id, name, salary){
    //this -> new object
    this.id = id;
    this.name = name;
    this.salary = salary;

    this.display = function(){
        console.log(this.id, this.name, this.salary);
    }
    //this -> returned by default
}


/* function Spinner(){
    var counter = 0;
    this.up = function(){
        return ++counter;
    };
    this.down = function(){ 
        return --counter; 
    }
} */

function Spinner(){
    this.__counter__ = 0;
}
Spinner.prototype.up = function(){ 
    return ++this.__counter__;
}
Spinner.prototype.down = function(){
    return --this.__counter__;
}

var Spinner = (function(){
    var counterSymbol = Symbol();

    function Spinner(){
        this[counterSymbol] = 0;
    }
    Spinner.prototype.up = function(){ 
        return ++this[counterSymbol];
    }
    Spinner.prototype.down = function(){
        return --this[counterSymbol];
    }
    return Spinner;
    
})();

var spinner = new Spinner();
