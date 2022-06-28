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
    const appliedTaxes = this.taxes
      .map(tax => tax.apply(product))
      .reduce((acc, step) => (acc.appliedTaxes.add(step.appliedTaxes)));

    return {
      taxedValue: product.money.add(appliedTaxes),
      appliedTaxes,
    }
  }
}

const freeTaxesFrom = (product) => ({
  taxedValue: product.money,
  appliedTaxes: Money.ZERO,
});

function calculateTaxes(product, taxCharge) {
  const taxedValue = product.money.add(product.money.multiply(taxCharge).roundTo05());
  return {
    taxedValue,
    appliedTaxes: taxedValue.subtract(product.money),
  };
}
