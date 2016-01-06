var LetterSet = require('./letterSet');

function Chord(letter, chordType) {
  // new Key('Cm')
  this._letter = letter;
  this._chordType = chordType;
}

Chord.prototype.getLetterSet = function () {
  var intervalSet = this._chordType.getIntervalSet();
  return new LetterSet(this._letter, intervalSet);
}


module.exports = Chord;
