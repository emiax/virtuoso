var names = require('./names');
var IntervalSet = require('./intervalSet');

function ChordType(props) {
  this._props = props;
}

ChordType.prototype.getIntervalSet = function () {
  var props = this._props;
  var intervals = {};

  // Prime
  intervals['prime'] = true;

  // Third or sus
  if (props['m']) {
    // minor third
    intervals['minor 3rd'] = true;
  } else if (props['sus4']) {
    intervals['perfect 4th'] = true;
  } else if (props['sus2']) {
    intervals['major 2nd'] = true;
  } else {
    // default: major third
    intervals['major 3rd'] = true;
  }

  // Fifth
  if (props['+']) {
    intervals['augmented 5th'] = true;
  } else {
    intervals['perfect 5th'] = true;
  }

  if (props['7']) {
    intervals['minor 7th'] = true;
  } else if (props['maj7']) {
    intervals['major 7th'] = true;
  }
    
    
  // Ninth
  if (props['add9']) {
    intervals['9th'] = true;
  }
  
  if (props['9']) {
    intervals['7th'] = true;    
    intervals['9th'] = true;
  }

  // Eleventh
  if (props['add11']) {
    intervals['11th'] = true;
  }
  
  if (props['11']) {
    intervals['7th'] = true;    
    intervals['9th'] = true;
    intervals['11th'] = true;
  }

  // Eleventh
  if (props['add13']) {
    intervals['13th'] = true;
  }

  // Thirteenth
  if (props['13']) {
    intervals['7th'] = true;    
    intervals['9th'] = true;
    intervals['11th'] = true;
    intervals['13th'] = true;
  }

  var halftoneMap = {};
  Object.keys(intervals).forEach(function (i) {
    halftoneMap[names.getHalftonesByIntervalName(i) % 12] = true;
  });

  var halftones = [];
  Object.keys(halftoneMap).forEach(function (k) {
    halftones.push(k);
  });

  return new IntervalSet(halftones);
}

module.exports = ChordType;
