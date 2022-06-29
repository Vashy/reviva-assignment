import { Multiple } from "./multiple-product.js";
import { MedicalProduct } from "./medical-product.js";
import { Money } from "../money/money.js";
import { BasicSalesTax, ImportDutyTax } from "../taxes/taxes.js";
import { GenericProduct } from "./generic-product.js";

describe('multiple product', () => {
  describe('when medical product', () => {
    it('should have no basic sales taxes', () => {
      const products = new Multiple(new MedicalProduct(new Money(10)), 3);

      const { total, salesTaxes } = products.applyTaxes(BasicSalesTax);

      expect(total).toStrictEqual(new Money(30));
      expect(salesTaxes).toStrictEqual(Money.ZERO);
    });

    it('should have import duty taxes at 5%', () => {
      const products = new Multiple(new MedicalProduct(new Money(10), true), 2);

      const { total, salesTaxes } = products.applyTaxes(ImportDutyTax);

      expect(total).toStrictEqual(new Money(21));
      expect(salesTaxes).toStrictEqual(new Money(1));
    });
  });

  describe('when generic product', () => {
    it('should have no basic sales taxes at 10%', () => {
      const products = new Multiple(new GenericProduct(new Money(10)), 2);

      const { total, salesTaxes } = products.applyTaxes(BasicSalesTax);

      expect(total).toStrictEqual(new Money(22));
      expect(salesTaxes).toStrictEqual(new Money(2));
    });
  });
});
