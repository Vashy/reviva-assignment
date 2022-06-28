import { Product } from "./product";

export class Book extends Product {
  productType = 'books';

  constructor(money, imported) {
    super(money, imported);
  }

  getDetails(taxes) {
    const { taxedValue } = taxes.apply(this);
    return {
      product: new Book(taxedValue, this.imported),
      quantity: 1,
    }
  }
}
