import { Money } from "./money.js";

describe('money', () => {
  it.each([
    ['5', '6.5', '11.5'],
    ['0.1', '0.2', '0.3'],
    ['10', '20', '30'],
  ])('should have value %s', (valueA, valueB, expected) => {
    const moneyA = new Money(valueA);
    const moneyB = new Money(valueB);

    const result = moneyA.add(moneyB);

    expect(result).toStrictEqual(new Money(expected));
  });

  describe('rounding', () => {
    it.each([
      ['15.343', '15.35'],
      ['750.1311', '750.15'],
      ['1.17', '1.20'],
      ['10.10', '10.10'],
      ['10', '10'],
    ])('%s should be rounded to %s', (value, rounded) => {
      const money = new Money(value);

      const result = money.roundTo05();

      expect(result).toStrictEqual(new Money(rounded));
    });
  });
});
