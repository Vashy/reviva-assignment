import { Money } from "../money.js";

export class Product {
  productType = 'generic';
  description = '';

  constructor(money, imported = false) {
    if (!(money instanceof Money)) {
      throw new Error(`Invalid type of money: ${money}. Expected: Money`);
    }
    this.money = money;
    this.imported = imported;
  }

  applyTaxes(taxes) {
    return taxes.apply(this);
  }
}