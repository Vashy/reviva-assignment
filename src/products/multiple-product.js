import { Money } from "../money.js";
import { Product } from "./product.js";

export class Multiple extends Product {
  constructor(product, quantity) {
    super(product.money, product.imported);
    this.product = product;
    this.productType = product.productType;
    this.quantity = quantity;
  }

  applyTaxes(taxes) {
    const { total, salesTaxes } = taxes.apply(this);

    return {
      total: total.multiply(new Money(this.quantity)),
      salesTaxes: salesTaxes.multiply(new Money(this.quantity)),
    }
  }

  getDetails(taxes) {
    const { product } = this.product.getDetails(taxes);
    return {
      product,
      total: this.applyTaxes(taxes).total,
      quantity: this.quantity,
    }
  }
}
