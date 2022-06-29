import currency from "currency.js";

export class Money {
  static ZERO = new Money(0);

  constructor(value) {
    this.value = currency(value);
  }

  add(otherMoney) {
    return new Money(this.value.add(otherMoney.value));
  }

  multiply(value) {
    return new Money(this.value.multiply(value));
  }

  subtract(otherMoney) {
    return new Money(this.value.subtract(otherMoney.value));
  }

  roundTo05() {
    return new Money((Math.ceil(this.value.value * 20) / 20).toFixed(2));
  }

  toString() {
    return this.value.format({ separator: '', decimal: '.', precision: 2, symbol: '' });
  }
}
