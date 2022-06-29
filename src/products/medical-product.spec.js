import { Money } from "../money.js";
import { BasicSalesTax } from "../taxes/taxes.js";
import { MedicalProduct } from "./medical-product.js";

describe('medical product', () => {
  it('should have no basic sales taxes', () => {
    const product = new MedicalProduct(new Money('10'));

    const { total, salesTaxes } = product.applyTaxes(new BasicSalesTax());

    expect(total).toEqual(new Money('10'));
    expect(salesTaxes).toEqual(Money.ZERO);
  });

  it('should fail when value is not Money', () => {
    expect(() => new MedicalProduct([])).toThrow(new Error('Invalid type of money: . Expected: Money'));
    expect(() => new MedicalProduct(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
  });

  it('productType should be "medical"', () => {
    const product = new MedicalProduct(new Money(0));

    expect(product.productType).toEqual('medical');
  });

  it('getDetails()', () => {
    const aProduct = new MedicalProduct(new Money(20));

    const { total, product, quantity } = aProduct.getDetails(new BasicSalesTax());

    expect(total).toEqual(new Money(20));
    expect(product).toEqual(aProduct);
    expect(quantity).toEqual(1);
  });

  it.each([true, false])('imported should be %s', (imported) => {
    const product = new MedicalProduct(new Money(0), imported);

    expect(product.imported).toEqual(imported);
  });
});