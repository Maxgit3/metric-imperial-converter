let invalidNum, invalidUnit


function ConvertHandler() {
  
  this.getNum = function(input) {
    let nums = "0123456789";
    let decimalPoint;
    let decimalNumber;
    let fractionSym;
    let fractionNum;

    
    console.log(typeof input, 'q')
    console.log(input, 'r')
    //check if string digit is a number
    function checkNum(x) {
      return nums.includes(x);
    }

    // combine number digits
    let numbers = [...input].reduce(
      (x, y) => (checkNum(y) ? x + y : x), '');
      

    console.log(numbers, 's')
    let unit = input.match(/[a-zA-Z]+/g);
    let dots = input.match(/\./g)
    let dashes = input.match(/\//g)
    let numparts = numbers.length;
    if (dots) {
      if (dots.length <= 2) {
        numparts += dots.length
      }
      
    }

    if (dashes) {
      if (dashes.length == 1) {
        numparts += dashes.length
      }  
    }
    // console.log(dots)
    // console.log(dashes)
    // console.log(unit, 't')
    // console.log(unit[unit.length - 1].length, 'u')
    // console.log(input.length - unit[unit.length - 1].length, 'v')
    // console.log(numparts.length < (input.length - unit[unit.length - 1].length), 'w')
    if (!numbers) {
      return 1;
    }

    if (unit) {
      if (numparts < (input.length - unit[unit.length - 1].length)) {
        return 'invalid number'
      }
    }


    // add decimal point to number if no backslash 
    if (input.includes('.') && !input.includes('/')) {
        decimalPoint = input.indexOf('.')

        decimalNumber = numbers.slice(0, decimalPoint)
        + '.' + numbers.slice(decimalPoint);

        if (!decimalNumber) {
          return 1
        }
        return Number(decimalNumber)
      }

      // check for fraction
      if (input.includes('/')) {
        
        if (input.match(/\//g).length > 1) {
          return 'invalid number';
        }


        if (input.includes('.')) {

          decimalPoint = input.indexOf('.');
          fractionSym = input.indexOf('/')
          if (decimalPoint > fractionSym) {
            decimalPoint -= 1;
          }
          decimalNumber = numbers.slice(0, decimalPoint)
            + '.' + numbers.slice(decimalPoint);

            let numerator = decimalNumber.slice(0, fractionSym);
            let denominator = decimalNumber.slice(fractionSym);
            console.log(numerator)
            console.log(denominator)

            fractionNum = Number(numerator) / Number(denominator);
            console.log(fractionNum)

        } else {
          fractionSym = input.indexOf('/')

          let numerator = numbers.slice(0, fractionSym);
          let denominator = numbers.slice(fractionSym);

          fractionNum = Number(numerator) / Number(denominator);
        }

        if (!fractionNum) {
          return 1
        }
        return Number(fractionNum);
      }
    
    return Number(numbers);
  };
  
  this.getUnit = function(input) {
    let units = ['gal', 'L', 'lbs', 'kg', 'mi', 'km']
    let unit = input.match(/[a-zA-Z]+/g);
    // let withoutNumbers = input.replace(/\d+/g, '').toLowerCase();
    

    if (unit.length > 1) {
      unit = unit[unit.length - 1].toLowerCase();
    
    } else {
      unit = unit[0].toLowerCase();
    }
    if (unit == 'l') {
      unit = 'L'
    }
    if (!units.includes(unit)) {
        return 'invalid unit'
    }

    if (unit == '' || unit == undefined) {
      return 'invalid unit'
    }
    
    return unit;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
    }
    
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch(unit) {
      case 'gal':
        result = 'gallons';
        break;
      case 'L':
        result = 'liters';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = parseFloat((galToL * initNum).toFixed(5));
        break;
      case 'L':
        result = parseFloat((initNum / galToL).toFixed(5));
        break;
      case 'lbs':
        result = parseFloat((lbsToKg * initNum).toFixed(5));
        break;
      case 'kg':
        result = parseFloat((initNum / lbsToKg).toFixed(5));
        break;
      case 'mi':
        result = parseFloat((initNum * miToKm).toFixed(5));
        break;
      case 'km':
        result = parseFloat((initNum / miToKm).toFixed(5));
        break;
    }
    
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
