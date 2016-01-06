function Key() {
  // new Key(new Letter('c'), 1) // C1
  // new Key(0) // C-1
  
  if (arguments.length == 1) {
    this.setFromMidiNote(arguments[0]);
  } else if (arguments.length == 2) {
    this.setFromLetterAndOctave(arguments[0], arguments[1]);
  } else {
    throw "invalid constructor arguments";
  }
}

Key.prototype.setFromMidiNote = function (midiNote) {
  this._midiNote = midiNote;
};

Key.prototype.setFromLetterAndOctave = function (letter, octave) {
  var midiNote = letter.halftone();
  midiNote += octave * 12;
  this._midiNote = midiNote;
};

Key.prototype.getMidiNote = function () {
  return this._midiNote;
}


module.exports = Key;
