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
    keys.push(new Key(l, 6));
  });
  
  var i = 0; 
  keys.forEach(function (k) {
    var note = new Note(k, 1/8, 50);
    sequence.insert(note, start + i * 1/8);
    i++;
  });
}

var l = 0;
for (var i = 0; i < 10; i++) {
  insertArpeggio(Parser.parseChord('Cmaj7'), sequence, l + 0);
  insertArpeggio(Parser.parseChord('Am7'), sequence, l + 1/2);
  insertArpeggio(Parser.parseChord('F'), sequence, l + 2/2);
  insertArpeggio(Parser.parseChord('G'), sequence, l + 3/2);
  l += 2;
}

var player = new Player(new Meter(4, 4), 220);

player.play(sequence);
