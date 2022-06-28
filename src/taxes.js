import { Money } from "./money";

const importDutyTax = new Money(.05);
const basicSalesTax = new Money(.10);

export class BasicSalesTax {
  apply(product) {
    if (product.productType === 'music') {
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

const freeTaxesFrom = (product) => ({
  taxedValue: product.money,
  appliedTaxes: Money.ZERO,
});

function calculateTaxes(product, taxCharge) {
  const taxedValue = product.money.add(product.money.multiply(taxCharge));
  return {
    taxedValue,
    appliedTaxes: taxedValue.subtract(product.money),
  };
}

