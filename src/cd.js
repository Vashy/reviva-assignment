import { Product } from "./product";

export class MusicCD extends Product {
  productType = 'music';

  constructor(money, imported = false) {
    super(money, imported);
  }

  getDetails(taxes) {
    const { taxedValue } = taxes.apply(this);
    return {
      product: new MusicCD(taxedValue, this.imported),
      quantity: 1,
    }
  }
}
