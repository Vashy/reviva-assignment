import { Product } from "./product.js";
import { MUSIC } from "./product.types.js";

export class MusicCD extends Product {
  productType = MUSIC;

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
