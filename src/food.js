import { Product } from "./product";

export class Food extends Product {
  productType = 'food';

  constructor(money, imported = false) {
    super(money, imported)
  }

  getDetails(taxes) {
    const { taxedValue } = taxes.apply(this);
    return {
      product: this,
      total: taxedValue,
      quantity: 1,
    }
  }
}
