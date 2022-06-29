import { Product } from "./product.js";

export class GenericProduct extends Product {
  productType = 'generic';

  constructor(money, imported, description) {
    super(money, imported, description);
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
