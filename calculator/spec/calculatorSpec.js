//describe, it, expect 
describe('A calculator', function(){

    it('should add 2 numbers', function(){
        //Arrange
        var x = 10,
            y = 20,
            expectedResult = 30;

        //Act
        var result = add(x,y);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add numbers in string format', function(){
        //Arrange
        var x = 10,
            y = '20',
            expectedResult = 30;

        //Act
        var result = add(x,y);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should ignore string that cannot be converted to numbers', function(){
        //Arrange
        var x = 10,
            y = 'abc',
            expectedResult = 10;

        //Act
        var result = add(x,y);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add array of numbers', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([10,20], [30,40]);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add array of numbers in string format', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([10,20], [30,'40']);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should ignore strings that cannot be converted to numbers in array', function(){
        //Arrange
        var expectedResult = 60;

        //Act
        var result = add([10,20], [30,'abc']);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add nested array of values', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add([10,20], [30,[40,'abc']])

        //Assert
        expect(result).toBe(expectedResult);
    });



    it('should add functions returning numbers', function(){
        //Arrange
        var expectedResult = 30;

        //Act
        var result = add(function(){ return 10; }, function(){ return 20; })

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add functions returning numbers in string format', function(){
        //Arrange
        var expectedResult = 30;

        //Act
        var result = add(function(){ return 10; }, function(){ return '20'; })

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add functions returning strings that cannot be converted into numbers', function(){
        //Arrange
        var expectedResult = 10;

        //Act
        var result = add(function(){ return 10; }, function(){ return 'abc'; })

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should add functions returning nested array of values', function(){
        //Arrange
        var expectedResult = 100;

        //Act
        var result = add(function(){ return [10,20]; }, function(){ return [30,[40,'abc']]; })

        //Assert
        expect(result).toBe(expectedResult);
    });


    it('should add 1 number', function(){
        //Arrange
        var x = 10,
            expectedResult = 10;

        //Act
        var result = add(x);

        //Assert
        expect(result).toBe(expectedResult);
    });

    it('should return 0 when not values are passed', function(){
        //Arrange
        var expectedResult = 0;

        //Act
        var result = add();

        //Assert
        expect(result).toBe(expectedResult);
    });



    it('should add varying number of arguments', function(){
        //Arrange
        var expectedResult = 150;

        //Act
        var result = add(10,20,30,40,50);

        //Assert
        expect(result).toBe(expectedResult);
    });

});