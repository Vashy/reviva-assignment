import { MusicCD } from "./music-cd.js";
import { Money } from "../money/money.js";
import { BasicSalesTax } from "../taxes/taxes.js";
import { MUSIC } from "./product.types.js";

describe('music cd', () => {
    it.each(['5', '6.5', '17.45'])('should have value %s', (value) => {
      const cd = new MusicCD(new Money(value));
  
      const result = cd.money;
  
      expect(result).toStrictEqual(new Money(value));
    });
  
    it.each([
        ['10', '11'], 
        ['5', '5.5'], 
        ['20', '22'],
    ])('should have no basic sales taxes, value %s', (value, expectedValue) => {
      const cd = new MusicCD(new Money(value));
  
      const { total, salesTaxes } = cd.applyTaxes(BasicSalesTax);
  
      expect(total).toStrictEqual(new Money(expectedValue));
      expect(salesTaxes).toStrictEqual(new Money(expectedValue - value));
    });
  
    it('should fail when value is not Money', () => {
      expect(() => new MusicCD('a')).toThrow(new Error('Invalid type of money: a. Expected: Money'));
      expect(() => new MusicCD(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
      expect(() => new MusicCD([])).toThrow(new Error('Invalid type of money: . Expected: Money'));
    });
  
    it('productType should be "music"', () => {
      const book = new MusicCD(new Money(0));
  
      expect(book.productType).toStrictEqual(MUSIC);
    });
  
    it.each([true, false])('imported should be %s', (imported) => {
      const book = new MusicCD(new Money(0), imported);
  
      expect(book.imported).toStrictEqual(imported);
    });
  });
