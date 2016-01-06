names = {};


var drums = {
  '35': ['acoustic bass drum'],
  '59': ['ride cymbal 2'],
  '36': ['bass', 'bass drum', 'bass drum 1'],
  '60': ['hi bongo'],
  '37': ['side stick'],
  '61': ['low bongo'],
  '38': ['snare', 'snare drum', 'acoustic snare'],
  '62': ['mute hi conga'],
  '39': ['clap', 'hand clap'],
  '63': ['open hi conga'],
  '40': ['electric snare'],
  '64': ['low conga'],
  '41': ['low floor tom'],
  '65': ['high timbale'],
  '42': ['hi-hat', 'closed hi-hat'],
  '66': ['low timbale'],
  '43': ['high floor tom'],
  '67': ['high agogo'],
  '44': ['pedal hi-hat'],
  '68': ['low agogo'],
  '45': ['low tom'],
  '69': ['cabasa'],
  '46': ['open hi-hat'],
  '70': ['maracas'],
  '47': ['low-mid tom'],
  '71': ['short whistle'],
  '48': ['hi-mid tom'],
  '72': ['long whistle'],
  '49': ['crash', 'crash 1', 'crash cymbal', 'crash cymbal 1'],
  '73': ['short guiro'],
  '50': ['high tom'],
  '74': ['long guiro'],
  '51': ['ride', 'ride 1', 'ride cymbal', 'ride cymbal 1'],
  '75': ['claves'],
  '52': ['chinese cymbal'],
  '76': ['hi wood block'],
  '53': ['ride bell'],
  '77': ['low wood block'],
  '54': ['tambourine'],
  '78': ['mute cuica'],
  '55': ['splash cymbal'],
  '79': ['open cuica'],
  '56': ['cowbell'],
  '80': ['mute triangle'],
  '51': ['crash 2', 'crash cymbal 2'],
  '81': ['open triangle'],
  '58': ['vibraslap']
};

var drumConversions = [];
Object.keys(drums).forEach(function (halftones) {
  drums[halftones].forEach(function (name) {
    drumConversions.push([name, halftones]);
  });
});
drumConversions.sort(function (a, b) {
  return b[0].length - a[0].length;
});

names.getHalftonesByDrumName = function (name) {
  for (var i = 0; i < drumConversions.length; i++) {
    if (drumConversions[i][0] === 'name') {
      return drumConversions[i][1];
    }
  }
  throw "invalid drum name";
}

names.getDrumHalftones = function () {
  return drumConversions;
}

names.getHalftonesByIntervalName = function (name) {

  var intervals = [
    /* 0 */ ['prime', '1st'],
    /* 1 */ ['minor second', 'minor 2nd'],
    /* 2 */ ['major second', 'major 2nd'],
    /* 3 */ ['minor third', 'minor 3rd'],
    /* 4 */ ['third', '3rd', 'major third', 'major 3rd'],
    /* 5 */ ['fourth', '4th', 'perfect fourth', 'perfect 4th'],
    /* 6 */ ['augmented fourth', 'augmented 4th', 'diminished fifth', 'diminished 5th', 'tritone'],
    /* 7 */ ['fifth', '5th', 'perfect fifth', 'perfect 5th'],
    /* 8 */ ['augmented fifth', 'augmented 5th', 'minor sixth', 'minor 6th'],
    /* 9 */ ['sixth', '6th', 'major sixth', 'major 6th'],
    /* 10 */ ['seventh', '7th', 'minor seventh', 'minor 7th'],
    /* 11 */ ['major seventh', 'major 7th'],
    /* 12 */ ['octave', '8th'],
    /* 13 */ [],
    /* 14 */ ['ninth', '9th'],
    /* 15 */ [],
    /* 16 */ [],
    /* 17 */ ['eleventh', '11th'],
    /* 18 */ [],
    /* 19 */ [],
    /* 20 */ [],
    /* 21 */ ['thirteenth', '13th']
  ];

  for (var i = 0; i < intervals.length; i++) {
    var names = intervals[i];
    for (var j = 0; j < names.length; j++) {
      if (names[j] === name) {
        return i;
      }
    }
  }

  throw ("invalid interval: " + name);
}


module.exports = names;
