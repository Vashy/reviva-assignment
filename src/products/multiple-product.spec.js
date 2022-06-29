import { Multiple } from "./multiple-product.js";
import { MedicalProduct } from "./medical-product.js";
import { Money } from "../money.js";
import { BasicSalesTax, ImportDutyTaxes } from "../taxes/taxes.js";
import { GenericProduct } from "./generic-product.js";

describe('multiple product', () => {
  describe('when medical product', () => {
    it('should have no basic sales taxes', () => {
      const products = new Multiple(new MedicalProduct(new Money(10)), 3);

      const { total, salesTaxes } = products.applyTaxes(new BasicSalesTax());

      expect(total).toEqual(new Money(30));
      expect(salesTaxes).toEqual(Money.ZERO);
    });

    it('should have import duty taxes at 5%', () => {
      const products = new Multiple(new MedicalProduct(new Money(10), true), 2);

      const { total, salesTaxes } = products.applyTaxes(new ImportDutyTaxes());

      expect(total).toEqual(new Money(21));
      expect(salesTaxes).toEqual(new Money(1));
    });
  });

  describe('when generic product', () => {
    it('should have no basic sales taxes at 10%', () => {
      const products = new Multiple(new GenericProduct(new Money(10)), 2);

      const { total, salesTaxes } = products.applyTaxes(new BasicSalesTax());

      expect(total).toEqual(new Money(22));
      expect(salesTaxes).toEqual(new Money(2));
    });
  });
});
