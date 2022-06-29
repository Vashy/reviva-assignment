import { Money } from "../money.js";
import { BasicSalesTax } from "../taxes/taxes.js";
import { GenericProduct } from "./generic-product.js";

describe('generic product', () => {
  it('should have basic sales taxes at 10%', () => {
    const product = new GenericProduct(new Money('10'));

    const { total, salesTaxes } = product.applyTaxes(new BasicSalesTax());

    expect(total).toEqual(new Money('11'));
    expect(salesTaxes).toEqual(new Money('1'));
  });

  it('should fail when value is not Money', () => {
    expect(() => new GenericProduct([])).toThrow(new Error('Invalid type of money: . Expected: Money'));
    expect(() => new GenericProduct(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
  });

  it('productType should be "generic"', () => {
    const product = new GenericProduct(new Money(0));

    expect(product.productType).toEqual('generic');
  });

  it('getDetails()', () => {
    const aProduct = new GenericProduct(new Money(20));

    const { total, product, quantity } = aProduct.getDetails(new BasicSalesTax());

    expect(total).toEqual(new Money(22));
    expect(product).toEqual(aProduct);
    expect(quantity).toEqual(1);
  });

  it.each([true, false])('imported should be %s', (imported) => {
    const product = new GenericProduct(new Money(0), imported);

    expect(product.imported).toEqual(imported);
  });
});
