import { Product } from "./product.js";

export class Book extends Product {
  productType = 'books';

  constructor(money, imported) {
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
