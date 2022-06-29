import { Money } from "../money/money.js";
import { GENERIC } from "./product.types.js";

export class Product {
  productType = GENERIC;

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
