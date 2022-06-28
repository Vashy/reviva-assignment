import { MusicCD } from "./cd";
import { Money } from "./money";
import { BasicSalesTax } from "./taxes";

describe('music cd', () => {
    it.each(['5', '6.5', '17.45'])('should have value %s', (value) => {
      const cd = new MusicCD(new Money(value));
  
      const result = cd.money;
  
      expect(result).toEqual(new Money(value));
    });
  
    it.each([
        ['10', '11'], 
        ['5', '5.5'], 
        ['20', '22'],
    ])('should have no basic sales taxes, value %s', (value, expectedValue) => {
      const cd = new MusicCD(new Money(value));
  
      const { taxedValue, appliedTaxes } = cd.applyTaxes(new BasicSalesTax());
  
      expect(taxedValue).toEqual(new Money(expectedValue));
      expect(appliedTaxes).toEqual(new Money(expectedValue - value));
    });
  
    it('should fail when value is not Money', () => {
      expect(() => new MusicCD('a')).toThrow(new Error('Invalid type of money: a. Expected: Money'));
      expect(() => new MusicCD(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
      expect(() => new MusicCD([])).toThrow(new Error('Invalid type of money: . Expected: Money'));
    });
  
    it('productType should be "music"', () => {
      const book = new MusicCD(new Money(0));
  
      expect(book.productType).toEqual('music');
    });
  
    it.each([true, false])('imported should be %s', (imported) => {
      const book = new MusicCD(new Money(0), imported);
  
      expect(book.imported).toEqual(imported);
    });
  });
  