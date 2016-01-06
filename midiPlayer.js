var midi = require('midi');
var output = new midi.output();
output.openVirtualPort("virtuoso");

var midiPlayer = {};

var NOTE_ON = 144;
var NOTE_OFF = 128;

midiPlayer.playNote = function (midiNote, velocity, delay, duration, channel) {
  if (channel < 0 || channel >= 16) {
    throw "invalid midi channel";
  }
//  console.log(channel);
  setTimeout(function () {
    output.sendMessage([NOTE_ON + channel, midiNote, velocity]);
    //console.log('midiNote: ' + velocity);
    setTimeout(function () {
      //console.log('note off');
      output.sendMessage([NOTE_OFF + channel, midiNote, velocity]);
    }, duration);
  }, delay);
}


module.exports = midiPlayer;



