import { Product } from "./product";

export class Book extends Product {
  productType = 'books';

  constructor(money, imported = false) {
    super(money, imported);
  }
}
