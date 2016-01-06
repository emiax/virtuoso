var Letter = require('./letter');
var ChordType = require('./chordType');
var Chord = require('./chord');
var Key = require('./key');
var names = require('./names');

function Parser(str) {
  this._string = str;
  this._pointer = 0;
};

Parser.prototype.remaining = function () {
  return this._string.length - this._pointer;
}

Parser.prototype.get = function (nChars) {
  if (nChars === undefined) {
    nChars = 1;
  }
  
  var s = this.peek(nChars); 
  this._pointer += nChars;
  return s;
}

Parser.prototype.peek = function (nChars) {
  if (nChars === undefined) {
    nChars = 1;
  }
  return this._string.substr(this._pointer, nChars);
}

Parser.prototype.consume = function (str) {
  //console.log('trying to consume ' + str + " from " + this._string.substr(this._pointer, str.length));
  
  var l = str.length;

  if (this.peek(l) === str) {
    this.get(l);
    return true;
  }
  return false;
}

Parser.prototype.parseNumber = function () {
  var number = '';
  while (!Number.isNaN(this.peek()) || this.peek() === '-') {
    number += this.get();
  }
  return +number;
}

Parser.prototype.parseLetter = function () {
  if (this.remaining() < 1) {
    throw "unexpected end of input";
  }
  
  var midiOffset = {
    "c": 0,
    "d": 2,
    "e": 4,
    "f": 5,
    "g": 7,
    "a": 9,
    "b": 11
  }[this.get().toLowerCase()];
  

  if (midiOffset === undefined) {
    throw "invalid character";
  }
  
  if (this.remaining() >= 1) {
    if (this.consume("#")) {
      midiOffset++;
    } else if (this.consume("b")) {
      midiOffset--;
    }
  }
  
  return new Letter(midiOffset);
};

Parser.prototype.parseKey = function () {
  var key;
  try {
    key = this.parseDrum();
  } catch (e) {
    var letter = this.parseLetter();
    var octave = this.parseNumber();
    key = Key(letter, octave);
  }
  return key;
}

Parser.prototype.parseDrum = function () {
  var drumHalftones = names.getDrumHalftones();
  for (var i = 0; i < drumHalftones.length; i++) {
    if (this.consume(drumHalftones[i][0])) {
      return new Key(drumHalftones[i][1]);
    }
  }
  throw "invalid drum name";
}

Parser.prototype.parseChordType = function () {
  var props = {};
  while (this.remaining() > 0) {
    if (this.consume('6')) {
      props['6'] = true;
    } else if (this.consume('7')) {
      props['7'] = true;
    } else if (this.consume('maj7') ||
               this.consume('maj')) {
      props['maj7'] = true;
    } else if (this.consume('sus4')) {
      props['sus4'] = true;
    } else if (this.consume('sus2')) {
      props['sus2'] = true;
    } else if (this.consume('sus')) {
      props['sus4'] = true;
    } else if (this.consume('9')) {
      props['9'] = true;
    } else if (this.consume('11')) {
      props['11'] = true;
    } else if (this.consume('13')) {
      props['13'] = true;
    } else if (this.consume('add9')) {
      props['add9'] = true;
    } else if (this.consume('add11')) {
      props['add11'] = true;
    } else if (this.consume('add13')) {
      props['add13'] = true;
    } else if (this.consume('+') ||
               this.consume('aug')) {
      props['+'] = true;
    } else if (this.consume('dim')) {
      props['dim'] = true;
    } else if (this.consume("-") ||
               this.consume("m") ||
               this.consume("minor")) {
      props['m'] = true;
    } else {
      throw "invalid chord type"
    }
  }
  
  return new ChordType(props);
}



Parser.prototype.parseChord = function (name) {
  var letter = this.parseLetter();
  var chordType = this.parseChordType();
  return new Chord(letter, chordType);
}

// Static methods, expecing input to 

Parser.parseLetter = function (name) {
  var p = new Parser(name);
  var letter = p.parseLetter();
  if (p.remaining() > 0) {
    throw "expected end of input"
  }
  return letter;
}

Parser.parseKey = function (name) {
  var p = new Parser(name);
  var key = p.parseKey();
  if (p.remaining() > 0) {
    throw "expected end of input"
  }
  return key;
}

Parser.parseChordType = function (name) {
  var p = new Parser(name);
  var chordType = p.parseChordType();
  if (p.remaining() > 0) {
    throw "expected end of input"
  }
  return chordType;
}

Parser.parseChord = function (name) {
  var p = new Parser(name);
  var chord = p.parseChord();
  if (p.remaining() > 0) {
    throw "expected end of input"
  }
  return chord;
}



module.exports = Parser;
