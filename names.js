names = {};

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
