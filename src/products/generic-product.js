import { Product } from "./product.js";
import { GENERIC } from "./product.types.js";

export class GenericProduct extends Product {
  productType = GENERIC;

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
