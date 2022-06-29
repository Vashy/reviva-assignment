import { Product } from "./product.js";
import { MEDICAL } from "./product.types.js";

export class MedicalProduct extends Product {
  productType = MEDICAL;

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
