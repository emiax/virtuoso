var midiPlayer = require('./midiPlayer');

function Player(meter, tempo) {
  this._meter = meter;
  this._tempo = tempo;
}




Player.prototype.play = function (sequence, channel) {
  var pulseTime = (60 * 1000) / this._tempo;
  var measureTime = pulseTime * this._meter.numerator();
  sequence.forEachNote(function (note, timing) {
    var startTime = timing * measureTime;
    var duration = note.value() * measureTime;
    var midiNote = note.key().getMidiNote();
    var velocity = note.velocity();
  
    midiPlayer.playNote(midiNote, velocity, startTime, duration, channel);
  });

}

module.exports = Player;
