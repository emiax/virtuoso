var Parser = require('./parser');
var Player = require('./player');
var Meter = require('./meter');
var Key = require('./key');
var Note = require('./note');
var Sequence = require('./sequence');

var sequence = new Sequence();


function insertArpeggio(chord, sequence, start) {
  var letters = chord.getLetterSet().getLetters();
  var keys = [];
  letters.forEach(function (l) {
    keys.push(new Key(l, 5));
  });
  letters.forEach(function (l) {
    keys.push(new Key(l, 6));
  });

  
  var i = 0; 
  keys.forEach(function (k) {
    var note = new Note(k, 1/8, 30 + Math.random() * 70);
    sequence.insert(note, start + i * 1/8);
    i++;
  });
}

var l = 0;
for (var i = 0; i < 5; i++) {
  insertArpeggio(Parser.parseChord('Cmaj7'), sequence, l + 0);
  insertArpeggio(Parser.parseChord('Cmaj7'), sequence, l + 1);
  insertArpeggio(Parser.parseChord('Dm7'), sequence, l + 2);
  insertArpeggio(Parser.parseChord('Dm7'), sequence, l + 3);
  l += 4;
}

// drum sequencer
var drumSeq = new Sequence();
for (var i = 0; i < 20; i += 2) {
  drumSeq.insert(new Note(Parser.parseKey('bass'), 1/16, 100), i);
  drumSeq.insert(new Note(Parser.parseKey('bass'), 1/16, 100), i + 1);
  drumSeq.insert(new Note(Parser.parseKey('bass'), 1/16, 100), i + 1 + 1/4);
 
  drumSeq.insert(new Note(Parser.parseKey('snare'), 1/16, 100), i + 1/2);
  drumSeq.insert(new Note(Parser.parseKey('snare'), 1/16, 100), i + 1 + 1/2);

  if (Math.random() > 0.8) {
    drumSeq.insert(new Note(Parser.parseKey('snare'), 1/16, 100), i + 1 + 3/4);
  }

  for (var j = 0; j < 2; j += 1/8) {
    drumSeq.insert(new Note(Parser.parseKey('hi-hat'), 1/16, 100), i + j);
  }
}


var player = new Player(new Meter(4, 4), 220);

player.play(sequence, 0);
player.play(drumSeq, 1);
