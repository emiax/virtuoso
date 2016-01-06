function Meter(numerator, denominator) {
  this._numerator = numerator;
  this._denominator = denominator;
}

Meter.prototype.numerator = function (numerator) {
  if (numerator !== undefined) {
    this._numerator = numerator;
  }
  return this._numerator;
};

Meter.prototype.denominator = function (denominator) {
  if (denominator !== undefined) {
    this._denominator = denominator;
  }
  return this._denominator;
};

Meter.prototype.getQuote = function () {
  return this._numerator / _denominator;
}


module.exports = Meter;
