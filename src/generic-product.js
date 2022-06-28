import { Product } from "./product";

export class GenericProduct extends Product {
  productType = 'generic';

  constructor(money, imported, description) {
    super(money, imported);
    this.description = description;
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
