import { Money } from "./money";

const importDutyTax = new Money(.05);
const basicSalesTax = new Money(.10);

export class BasicSalesTax {
  apply(product) {
    if (['music', 'generic'].includes(product.productType)) {
      return calculateTaxes(product, basicSalesTax);
    }
    return freeTaxesFrom(product);
  }
}

export class ImportDutyTaxes {
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
