import { Product } from "./product";

export class Book extends Product {
  productType = 'books';

  constructor(money, imported) {
    super(money, imported);
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
