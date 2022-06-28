import { Money } from "./money";
import { Product } from "./product";

export class Multiple extends Product {
  constructor(product, quantity) {
    super(product.money, product.imported);
    this.product = product;
    this.productType = product.productType;
    this.quantity = quantity;
  }

  applyTaxes(taxes) {
    const { taxedValue, appliedTaxes } = taxes.apply(this);

    return {
      taxedValue: taxedValue.multiply(new Money(this.quantity)),
      appliedTaxes: appliedTaxes.multiply(new Money(this.quantity)),
    }
  }

  getDetails(taxes) {
    const { product } = this.product.getDetails(taxes);
    return {
      product,
      total: this.applyTaxes(taxes).taxedValue,
      quantity: this.quantity,
    }
  }
}
