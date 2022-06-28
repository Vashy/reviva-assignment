import { Food } from "./food";
import { Money } from "./money";
import { BasicSalesTax } from "./taxes";

describe('food', () => {
  it('should have correct value', () => {
    const food = new Food(new Money('15'));

    const result = food.money;

    expect(result).toEqual(new Money('15'));
  });

  it('should have no basic sales taxes', () => {
    const food = new Food(new Money('10'));

    const { taxedValue, appliedTaxes } = food.applyTaxes(new BasicSalesTax());

    expect(taxedValue).toEqual(new Money('10'));
    expect(appliedTaxes).toEqual(Money.ZERO);
  });

  it('should fail when value is not Money', () => {
    expect(() => new Food('a')).toThrow(new Error('Invalid type of money: a. Expected: Money'));
    expect(() => new Food(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
  });

  it('productType should be "food"', () => {
    const food = new Food(new Money(0));

    expect(food.productType).toEqual('food');
  });

  it.each([true, false])('imported should be %s', (imported) => {
    const food = new Food(new Money(0), imported);

    expect(food.imported).toEqual(imported);
  });
});
