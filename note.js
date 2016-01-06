function Note(key, value, velocity) {
  this._key = key;
  this._value = value;
  this._velocity = velocity;
}

Note.prototype.key = function (key) {
  if (key !== undefined) {
    this._key = key;
  }
  return this._key;
};

Note.prototype.value = function (value) {
  if (value !== undefined) {
    this._value = value;
  }
  return this._value;
};

Note.prototype.velocity = function (velocity) {
  if (velocity !== undefined) {
    this._velocity = velocity;
  }
  return this._velocity;
};

module.exports = Note;
