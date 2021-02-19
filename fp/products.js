var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'}
];

function describe(title, fn){
    console.group(title);
    fn();
    console.groupEnd();
}

describe('Default list', function(){
    console.table(products);
});

/* 
1. sort
2. filter
3. group
*/

describe('Sort', function(){
    describe('Products By Id', function(){
        function sortProductsById(){
            for(var i=0; i<products.length-1; i++)
                for(var j=i+1; j<products.length; j++)
                    if (products[i].id > products[j].id){
                        var temp = products[i];
                        products[i] = products[j];
                        products[j] = temp;
                    }
        }
        sortProductsById();
        console.table(products);
    });

    describe('Sorting Any list by any attribute', function(){
        function sort(list, attrName){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (list[i][attrName] > list[j][attrName]){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        describe('Products by cost', function(){
            sort(products, 'cost');
            console.table(products);
        });

        describe('Products by units', function(){
            sort(products, 'units');
            console.table(products);
        });
    });

    describe('Sorting any list by any comparer', function(){
        function sort(list, comparerFn){
            for(var i=0; i<list.length-1; i++)
                for(var j=i+1; j<list.length; j++)
                    if (comparerFn(list[i], list[j]) > 0){
                        var temp = list[i];
                        list[i] = list[j];
                        list[j] = temp;
                    }
        }
        var productsComparerByValue = function(p1, p2){
            var p1Value = p1.cost * p1.units,
                p2Value = p2.cost * p2.units;
            if (p1Value < p2Value) return -1;
            if (p1Value > p2Value) return 1;
            return 0;
        };
        describe('Products by value [cost * units]', function(){
            sort(products, productsComparerByValue);
            console.table(products);
        });
        describe('Products by value in desc order', function(){
            function getDescComparer(comparerFn){
                return function(p1, p2){
                    return comparerFn(p1, p2) * -1;
                };
            }
            var descComparer = getDescComparer(productsComparerByValue);
            sort(products, descComparer);
            console.table(products);
        });


    });


});

function describeGroup(obj){
    for(var key in obj){
        describe('Key - [' + key + ']', function(){
            console.table(obj[key]);
        });
    }
}

describe('Filter', function(){
    describe('Filter stationary products', function(){
        function filterStationaryProducts(){
            var stationaryProducts = [];
            for(var index = 0, count = products.length; index < count; index++){
                if (products[index].category === 'stationary'){
                    stationaryProducts.push(products[index]);
                }
            }
            return stationaryProducts;
        }
        var stationaryProducts = filterStationaryProducts();
        console.table(stationaryProducts);
    });

    describe('Any list by any criteria', function(){
        function filter(list, predicate){
            var result = [];
            for(var index = 0, count = list.length; index < count; index++){
                if (predicate(list[index])){
                    result.push(list[index]);
                }
            }
            return result;
        }

        /* function negate(predicate){
            return function(p){
                return !predicate(p);
            };
        } */

        var negate = predicate => p => !predicate(p);

        describe('products by cost', function(){
            /* 
            var costlyProductPredicate = function(p){
                return p.cost > 50;
            }; 
            */
            var costlyProductPredicate = p => p.cost > 50;
            describe('costly products [cost > 50]', function(){
                //var costlyProducts = filter(products, costlyProductPredicate);
                var costlyProducts = filter(products, p => p.cost > 50);
                console.table(costlyProducts);
            });

            describe('affordable products', function(){
                var affordableProductPredicate = negate(costlyProductPredicate);
                var affordableProducts = filter(products, affordableProductPredicate);
                console.table(affordableProducts);
            })
        });

        describe('Products by units', function(){
            var underStockedProductPredicate = function(p){
                return p.units < 50;
            };
            describe('understocked products [units < 50]', function(){
                var underStockedProducts = filter(products, underStockedProductPredicate);
                console.table(underStockedProducts)
            });

            describe('wellstocked products', function(){
                var wellStockedProductPredicate = negate(underStockedProductPredicate);
                var wellStockedProducts = filter(products, wellStockedProductPredicate);
                console.table(wellStockedProducts);
            })
        })
    });
});

describe('group', function(){
    function group(list, keySelectorFn){
        var result = {};
        for(var index = 0, count = list.length; index < count; index++){
            var key = keySelectorFn(list[index]);
            /* if (typeof result[key] === 'undefined') */
            /* if (result.hasOwnProperty(key)) */
            if (!result[key])
                result[key] = [];
            result[key].push(list[index]);
        }
        return result;
    }

    describe('products by category', function(){
        var categoryKeySelector = function(p){
            return p.category;
        };
        var productsByCategory = group(products, categoryKeySelector);
        describeGroup(productsByCategory);
    });

    describe('products by affordability (costly & affordable)', function(){
        var affordabilityKeySelector = function(p){
            return p.cost > 50 ? 'costly' : 'affordable'
        };
        var productsByAffordability = group(products, affordabilityKeySelector);
        describeGroup(productsByAffordability);
    });
})