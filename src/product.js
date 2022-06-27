import { Money } from "./money";

export class Product {
  productType = 'books';

  constructor(money, imported = false) {
    if (!(money instanceof Money)) {
      throw new Error(`Invalid type of money: ${money}. Expected: Money`);
    }
    this.money = money;
    this.imported = imported;
  }

  applyTaxes(taxes) {
    const { taxedValue } = taxes.apply(this);
    return taxedValue;
  }
}
