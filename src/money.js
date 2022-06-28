import currency from "currency.js";

export class Money {
  static ZERO = new Money(0);

  constructor(value) {
    this.value = currency(value);
  }

  add(otherMoney) {
    return new Money(this.value.add(otherMoney.value));
  }

  multiply(otherMoney) {
    return new Money(this.value.multiply(otherMoney.value));
  }
}
