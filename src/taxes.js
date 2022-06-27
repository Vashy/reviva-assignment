import { Money } from "./money";

const importDutyTax = new Money('1.05');
const basicSalesTax = new Money('1.10');

export class BasicSalesTax {
  apply(product) {
    if (product.productType === 'music') {
      return product.money.multiply(basicSalesTax);
    }
    return product.money;
  }
}

export class ImportDutyTaxes {
  apply(product) {
    if (product.imported) {
      return product.money.multiply(importDutyTax);
    }
    return product.money;
  }
}
