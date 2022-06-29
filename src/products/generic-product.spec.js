import { Money } from "../money.js";
import { BasicSalesTax } from "../taxes/taxes.js";
import { GenericProduct } from "./generic-product.js";

describe('generic product', () => {
  it('should have basic sales taxes at 10%', () => {
    const product = new GenericProduct(new Money('10'));

    const { total, salesTaxes } = product.applyTaxes(BasicSalesTax);

    expect(total).toStrictEqual(new Money('11'));
    expect(salesTaxes).toStrictEqual(new Money('1'));
  });

  it('should fail when value is not Money', () => {
    expect(() => new GenericProduct([])).toThrow(new Error('Invalid type of money: . Expected: Money'));
    expect(() => new GenericProduct(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
  });

  it('productType should be "generic"', () => {
    const product = new GenericProduct(new Money(0));

    expect(product.productType).toStrictEqual('generic');
  });

  it('getDetails()', () => {
    const aProduct = new GenericProduct(new Money(20));

    const { total, product, quantity } = aProduct.getDetails(BasicSalesTax);

    expect(total).toStrictEqual(new Money(22));
    expect(product).toStrictEqual(aProduct);
    expect(quantity).toStrictEqual(1);
  });

  it.each([true, false])('imported should be %s', (imported) => {
    const product = new GenericProduct(new Money(0), imported);

    expect(product.imported).toStrictEqual(imported);
  });
});
