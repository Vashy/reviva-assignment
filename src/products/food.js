import { Product } from "./product.js";

export class Food extends Product {
  productType = 'food';

  constructor(money, imported = false) {
    super(money, imported)
  }

  getDetails(taxes) {
    const { total } = taxes.apply(this);
    return {
      product: this,
      total,
      quantity: 1,
    }
  }
}
