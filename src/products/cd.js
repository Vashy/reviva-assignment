import { Product } from "./product.js";

export class MusicCD extends Product {
  productType = 'music';

  constructor(money, imported = false) {
    super(money, imported);
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