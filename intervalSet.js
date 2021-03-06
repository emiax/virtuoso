function IntervalSet(halftones) {
  var members = this._members = [];

  for (var i = 0; i < 12; i++) {
    members[i] = false;
  }

  halftones.forEach(function (t) {
    members[t % 12] = true;
  });
}

IntervalSet.prototype.getHalftones = function () {
  var a = [];
  for (var i = 0; i < 12; i++) {
    if (this._members[i]) {
      a.push(i);
    }
  }
  return a;
}

IntervalSet.prototype.addHalftone = function (i) {
  this._members[i] = true;
}

IntervalSet.prototype.removeHalftone = function (i) {
  this._members[i] = false;
}


module.exports = IntervalSet;
