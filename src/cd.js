import { Product } from "./product";

export class MusicCD extends Product {
  productType = 'music';

  constructor(money, imported = false) {
    super(money, imported);
  }
}
