import { Money } from "./money";
import { BasicSalesTax } from "./taxes";

export class MusicCD {
  productType = 'music';

  constructor(money, imported = false) {
    if (!(money instanceof Money)) {
      throw new Error(`Invalid type of money: ${money}. Expected: Money`);
    }
    this.money = money;
    this.imported = imported
  }

  applyTaxes(taxes) {
    if (taxes instanceof BasicSalesTax)
      return taxes.apply(this);
    return this.money;
  }
}