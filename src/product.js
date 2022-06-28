import { Money } from "./money";

export class Product {
  productType = 'generic';

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
