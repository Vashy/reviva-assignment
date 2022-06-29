import { Product } from "./product.js";

export class MedicalProduct extends Product {
  productType = 'medical';

  constructor(money, imported, description) {
    super(money, imported);
    this.description = description;
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
