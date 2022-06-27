import { Book } from './book';
import { ShopppingBasket } from "./shopping-basket";
import { MusicCD } from './cd';
import { Money } from './money';
import { BasicSalesTax, ImportDutyTaxes } from './taxes';

describe('basic sales taxes', () => {
  describe('on books', () => {
    it.each(['1', '2.5', '3'])('should be free, value = %s', (value) => {
      const book = new Book(new Money(value));

      const taxes = book.applyTaxes(new BasicSalesTax());

      expect(taxes).toEqual(new Money(value));
    });

    it('should be free on multiple items', () => {
      const books = new ShopppingBasket([new Book(new Money('12.49')), new Book(new Money('12.49'))]);

      const taxes = books.applyTaxes(new BasicSalesTax());

      expect(taxes).toEqual(new Money('24.98'));
    });
  });

  describe('on music CDs', () => {
    it.each([
      ['10', '11'],
      ['25', '27.5'],
      ['100', '110'],
    ])('should be 10\%, (value = %s, expected = %s)', (money, expected) => {
      const cd = new MusicCD(new Money(money));

      const taxes = cd.applyTaxes(new BasicSalesTax());

      expect(taxes).toEqual(new Money(expected));
    });

    it('should sum all taxed music CDs (10\%)', () => {
      // const books = new MusicCD([new Book(new Money('12.49')), new Book(new Money('12.49'))]);

      // const taxes = books.applyTaxes(new BasicSalesTax());

      // expect(taxes).toEqual(new Money('24.98'));
    });
  });
});

describe('import duty taxes', () => {
  describe('on imported books', () => {
    it.each([
      ['10', '10.5'],
      ['1', '1.05'],
      ['147', '154.35'],
    ])('should be 5\% with (value = %s, expected = %s)', (money, expected) => {
      const book = new Book(new Money(money), true);

      const taxed = book.applyTaxes(new ImportDutyTaxes());

      expect(taxed).toEqual(new Money(expected));
    });

    it('should sum all taxed books (5\%)', () => {
      const books = new ShopppingBasket([
        new Book(new Money('11.5'), true),
        new Book(new Money('12.35'), true),
      ]);

      const result = books.applyTaxes(new ImportDutyTaxes());

      const firstTaxed = new Money('11.5').multiply(new Money('1.05'));
      const secondTaxed = new Money('12.35').multiply(new Money('1.05'));
      expect(result).toEqual(firstTaxed.add(secondTaxed));
    });
  });

  describe('on not imported books', () => {
    it.each(['10', '10.5', '1', '1.05', '147', '154.35'])('should be free with (value = %s)', (money) => {
      const book = new Book(new Money(money), false);

      const taxed = book.applyTaxes(new ImportDutyTaxes());

      expect(taxed).toEqual(new Money(money));
    });

    it('should sum all books applying import duty taxes only on imported books', () => {
      const books = new ShopppingBasket([
        new Book(new Money('12.55'), true),
        new Book(new Money('20.1'), false),
      ]);

      const result = books.applyTaxes(new ImportDutyTaxes());

      const firstTaxed = new Money('12.55').multiply(new Money('1.05'));
      const secondTaxFree = new Money('20.1');
      expect(result).toEqual(firstTaxed.add(secondTaxFree));
    });
  });
});
