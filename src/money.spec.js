import { Money } from "./money";

describe('money', () => {
  it.each([
    ['5', '6.5', '11.5'],
    ['0.1', '0.2', '0.3'],
    ['10', '20', '30'],
  ])('should have value %s', (valueA, valueB, expected) => {
    const moneyA = new Money(valueA);
    const moneyB = new Money(valueB);

    const result = moneyA.add(moneyB);

    expect(result).toEqual(new Money(expected));
  });
});