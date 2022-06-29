import { Money } from "../money/money.js";
import { BOOKS, FOOD, MEDICAL } from "../products/product.types.js";

const importDutyTax = .05;
const basicSalesTax = .10;

export const BasicSalesTax = {
  apply(product) {
    if (![MEDICAL, FOOD, BOOKS].includes(product.productType)) {
      return calculateTaxes(product, basicSalesTax);
    }
    return freeTaxesFrom(product);
  }
}

export const ImportDutyTax = {
  apply(product) {
    if (product.imported) {
      return calculateTaxes(product, importDutyTax);
    }
    return freeTaxesFrom(product);
  }
}

export class Taxes {
  constructor(...taxes) {
    this.taxes = taxes;
  }

  apply(product) {
    const salesTaxes = this.taxes
      .map(tax => tax.apply(product))
      .reduce((acc, step) => (acc.salesTaxes.add(step.salesTaxes)));

    return {
      total: product.money.add(salesTaxes),
      salesTaxes,
    }
  }
}

export const AllTaxes = new Taxes(BasicSalesTax, ImportDutyTax);

const freeTaxesFrom = (product) => ({
  total: product.money,
  salesTaxes: Money.ZERO,
});

function calculateTaxes(product, taxCharge) {
  const total = product.money.add(product.money.multiply(taxCharge).roundTo05());
  return {
    total,
    salesTaxes: total.subtract(product.money),
  };
}
