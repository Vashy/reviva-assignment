import currency from "currency.js";

export class Money {
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
