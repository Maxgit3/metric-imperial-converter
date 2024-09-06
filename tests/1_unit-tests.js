const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('#isNumber', function() {
        let number = convertHandler.getNum('23')
        assert.isNumber(number, 'Is a number')
    })

    test('#isDecimal', function() {
        let decimal = convertHandler.getNum('23.23')
        assert.isNumber(decimal, 'Is a decimal number')
    })

    test('#isFraction', function() {
        let fraction = convertHandler.getNum('1/2kg')
        assert.isNumber(fraction, 'read fraction and return number')
    })

    test('#isDecimalandFraction', function() {
        let decimalFraction = convertHandler.getNum('1.2/3.4lbs')
        assert.isNumber(decimalFraction, 'read fraction with decimals and return number')
    })

    test('#doubleFraction', function() {
        let doubleFraction = convertHandler.getNum('3/2/3L')
        assert.equal(doubleFraction, 'invalid number',  'throws error for a double fraction')
    })

    test('#defaultValue', function() {
        let defaultValue = convertHandler.getNum('lbs');
        assert.equal(defaultValue, 1, 'returns one when no number is provided')
    })

    test('#readInputUnit', function() {
        let inputUnit = convertHandler.getUnit('GaL');
        assert.equal(inputUnit, 'gal', 'read valid input unit')
    })

    test('#invalidInputUnit', function() {
        let invalidUnit = convertHandler.getUnit('my');
        assert.equal(invalidUnit, 'invalid unit', 'throw error for invalid input unit')
    })

    test('#ValidReturnUnit', function() {
        let returnUnit = convertHandler.getReturnUnit('mi')
        assert.equal(returnUnit, 'km', 'get valid return unit')
    })

    test('#spelledOutUnit', function() {
        let spelledOut = convertHandler.spellOutUnit('km');
        assert.equal(spelledOut, 'kilometers', 'spells out a unit abbreviation');
    })

    test('#toL', function() {
        let toL = convertHandler.getReturnUnit('gal');
        assert.equal(toL, 'L', 'Convert to liters')
    })

    test('#toGal', function() {
        let toGal = convertHandler.getReturnUnit('L');
        assert.equal(toGal, 'gal', 'Convert to gallons')
    })

    test('#toMi', function() {
        let toMi = convertHandler.getReturnUnit('km');
        assert.equal(toMi, 'mi', 'Convert to kilometers')
    })

    test('#toKm', function() {
        let toMi = convertHandler.getReturnUnit('mi');
        assert.equal(toMi, 'km', 'Convert to miles')
    })

    test('#toKg', function() {
        let toKg = convertHandler.getReturnUnit('lbs');
        assert.equal(toKg, 'kg', 'Convert to kilograms')
    })

    test('#toLbs', function() {
        let toLbs = convertHandler.getReturnUnit('kg');
        assert.equal(toLbs, 'lbs', 'Convert to pounds')
    })
});