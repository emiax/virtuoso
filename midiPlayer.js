var midi = require('midi');
var output = new midi.output();
output.openVirtualPort("virtuoso");

var midiPlayer = {};

var NOTE_ON = 144;
var NOTE_OFF = 128;
var ALL_NOTES_OFF = 123;

output.sendMessage([ALL_NOTES_OFF, 0, 0]);


midiPlayer.playNote = function (midiNote, velocity, delay, duration) {
  setTimeout(function () {
    output.sendMessage([NOTE_ON, midiNote, velocity]);
    //console.log('midiNote: ' + velocity);
    setTimeout(function () {
      //console.log('note off');
      output.sendMessage([NOTE_OFF, midiNote, velocity]);
    }, duration);
  }, delay);
}


module.exports = midiPlayer;



