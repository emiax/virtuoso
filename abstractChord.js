var IntervalSet = require('./intervalSet');
var modes = require('./modes');
/**
 * An abstract chord is a scale tone (0 - 6) and a mode (interval set with 7 intervals)
 * Example: Feeding in a ionian scale and 2 as scale tone will produce an abstract III chord that  
 * when instansiated using the chord tones [1, 2, 3, 7, 9] to yield an interval set corresponding to a IIIm9 chord.
 */

function AbstractChord(scaletone, mode) {
  if (!modes.isValid(mode)) {
    throw "a mode must be an interval set with 7 intervals";
  }
  
  this._scaletone = scaletone;
  this._mode = mode;
}


AbstractChord.prototype.instantiate = function (chordTones) {
  // chord tones is for example [0 2 4] for a triad
  var t = this._scaletone;

  var scaletones = this._mode.getHalftones();

  var halftonesInScale = [];
  chordTones.forEach(function (ct) {
    halftonesInScale.push(scaletones[(t + ct) % 7] % 12);
  });

  var intervalSet = new IntervalSet(halftonesInScale);
  return intervalSet;
}

module.exports = AbstractChord;
