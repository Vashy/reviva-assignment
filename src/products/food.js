import { Product } from "./product.js";
import { FOOD } from "./product.types.js";

export class Food extends Product {
  productType = FOOD;

  constructor(money, imported, description) {
    super(money, imported, description)
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
