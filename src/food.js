import { Product } from "./product";

export class ChocolateBar extends Product {
  productType = 'food';

  constructor(money, imported = false) {
    super(money, imported)
  }

  getDetails(taxes) {
    const { taxedValue } = taxes.apply(this);
    return {
      product: new ChocolateBar(taxedValue, this.imported),
      quantity: 1,
    }
  }
}
