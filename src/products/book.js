import { Product } from "./product.js";
import { BOOKS } from "./product.types.js";

export class Book extends Product {
  productType = BOOKS;

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
