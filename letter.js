function Letter(halftone) {
  this.halftone(halftone);
}


Letter.prototype.halftone = function (halftone) {
  if (halftone !== undefined) {
    this._halftone = halftone;
  }
  return this._halftone;
}

module.exports = Letter;

