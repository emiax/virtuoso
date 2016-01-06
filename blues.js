var Parser = require('./parser');
var Player = require('./player');
var Meter = require('./meter');
var Key = require('./key');
var Note = require('./note');
var Sequence = require('./sequence');
var AbstractChord = require('./abstractChord');
var LetterSet = require('./letterSet');


var mode = Parser.parseMode('dorian');

var chordScaleTones = [0, 3, 0,    2, 0, 4, 5,  1,   4];
var values =          [1, 1, 2,    2, 2, 2, 1, 1/2,  1/2];

chordScaleTones = chordScaleTones.concat(chordScaleTones);
values = values.concat(values);

chordScaleTones.push(0);
values.push(1);


var letter = Parser.parseLetter('D');

var sequence = new Sequence();

var i = 0;
var time = 0;
chordScaleTones.forEach(function (st) {
  var value = values[i];
  var ac = new AbstractChord(st, mode);
  
  var letterSet = new LetterSet(letter, ac.instantiate([2, 6]));
  var baseSet = new LetterSet(letter, ac.instantiate([0]));
  
  var keys = [];
  var key = new Key(baseSet.getLetters()[0], 3);
  sequence.insert(new Note(key, value, 90), time);

  letterSet.getLetters().forEach(function (l) {
    var key = new Key(l, 5);
    sequence.insert(new Note(key, value, 90), time);
  });

  i++;
  time += value;
});



// drum sequence
var drumSeq = new Sequence();
for (var i = 0; i < 24; i += 2) {
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




var player = new Player(new Meter(4, 4), 320);

setTimeout(function () {
  player.play(sequence, 1);
  player.play(drumSeq, 2);
}, 1000);


