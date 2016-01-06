var Letter = require('./letter');
var IntervalSet = require('./intervalSet');

function LetterSet() {
  if (arguments.length == 2) {
    if (arguments[0] instanceof Letter &&
        arguments[1] instanceof IntervalSet) {
      this.setFromLetterAndIntervalSet(arguments[0], arguments[1]);
    } else {
      throw "invalid input";
    }
  } else {
    throw "invalid input";
  }
}

LetterSet.prototype.setFromLetterAndIntervalSet = function (letter, intervalSet) {
  var members = this._members = [];

  var prime = letter.halftone();
  var halftones = intervalSet.getHalftones();

  for (var i = 0; i < 12; i++) {
    members[i] = null;
  }
  
  halftones.forEach(function (ht) {
    var halftone = (prime + ht) % 12;
    members[halftone] = new Letter(halftone);
  });

};

LetterSet.prototype.getLetters = function () {
  var a = [];
  for (var i = 0; i < 12; i++) {
    if (this._members[i]) {
      a.push(this._members[i]);
    }
  }
  return a;
}



module.exports = LetterSet;
