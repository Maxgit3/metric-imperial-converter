'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let numString =  convertHandler.getNum(req.query.input);
    let num = numString;
    // console.log(typeof numString, typeof num)
    let numUnit = convertHandler.getUnit(req.query.input);

    if (numUnit == 'invalid unit' && num == 'invalid number') {
      res.send({error: 'invalid number and unit'})
    } else if (numUnit == 'invalid unit') {
      res.send({error: 'invalid unit'})
    } else if (num == 'invalid number') {
      res.send({error: 'invalid number'})
    } else {
      if (!num) {
        num = 1;
      }
      let retNum = convertHandler.convert(num, numUnit)
      let retUnit = convertHandler.getReturnUnit(numUnit);
      
      let numSpell = convertHandler.spellOutUnit(numUnit);
      let retSpell = convertHandler.spellOutUnit(retUnit);
  
      let textItem = convertHandler.getString(num, numSpell, retNum, retSpell)
      
      res.send({initNum: Number(num), initUnit: numUnit, returnNum: Number(retNum), returnUnit: retUnit, string: textItem})
    }

  })
  

};
