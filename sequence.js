function Sequence() {
  this._notes = [];
}

Sequence.prototype.insert = function (note, timing) {
  this._notes.push([note, timing]);
};

Sequence.prototype.forEachNote = function (fn) {
  this._notes.forEach(function (pair) {
    fn(pair[0], pair[1]);
  });
};

module.exports = Sequence;
