import { Money } from "./money";

const importDutyTax = new Money('1.05');
const basicSalesTax = new Money('1.10');

export class BasicSalesTax {
  apply(product) {
    if (product.productType === 'music') {
      return {
        taxedValue: product.money.multiply(basicSalesTax),
        appliedTaxes: product.money.multiply(new Money('0.1')),
      };
    }
    return {
      taxedValue: product.money,
      appliedTaxes: Money.ZERO,
    };
  }
}

export class ImportDutyTaxes {
  apply(product) {
    if (product.imported) {
      return { 
        taxedValue: product.money.multiply(importDutyTax),
        appliedTaxes: product.money.multiply(new Money('0.05')),
      };
    }
    return {
      taxedValue: product.money,
      appliedTaxes: Money.ZERO,
    };
  }
}
