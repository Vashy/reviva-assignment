import { Food } from "./food.js";
import { Money } from "../money.js";
import { BasicSalesTax } from "../taxes/taxes.js";

describe('food', () => {
  it('should have correct value', () => {
    const food = new Food(new Money('15'));

    const result = food.money;

    expect(result).toStrictEqual(new Money('15'));
  });

  it('should have no basic sales taxes', () => {
    const food = new Food(new Money('10'));

    const { total, salesTaxes } = food.applyTaxes(BasicSalesTax);

    expect(total).toStrictEqual(new Money('10'));
    expect(salesTaxes).toStrictEqual(Money.ZERO);
  });

  it('should fail when value is not Money', () => {
    expect(() => new Food('a')).toThrow(new Error('Invalid type of money: a. Expected: Money'));
    expect(() => new Food(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
  });

  it('productType should be "food"', () => {
    const food = new Food(new Money(0));

    expect(food.productType).toStrictEqual('food');
  });

  it.each([true, false])('imported should be %s', (imported) => {
    const food = new Food(new Money(0), imported);

    expect(food.imported).toStrictEqual(imported);
  });
});
