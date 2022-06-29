import { Money } from "../money.js";

export class Product {
  productType = 'generic';

  constructor(money, imported = false, description = '') {
    if (!(money instanceof Money)) {
      throw new Error(`Invalid type of money: ${money}. Expected: Money`);
    }
    this.money = money;
    this.imported = imported;
    this.description = description;
  }

  applyTaxes(taxes) {
    return taxes.apply(this);
  }
}
