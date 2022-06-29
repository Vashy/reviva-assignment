import { Book } from '../products/book.js';
import { ShopppingBasket } from "../shopping-basket.js";
import { MusicCD } from '../products/cd.js';
import { Money } from '../money.js';
import { AllTaxes, BasicSalesTax, ImportDutyTax } from './taxes.js';
import { GenericProduct } from '../products/generic-product.js';

describe('basic sales taxes', () => {
  describe('on books', () => {
    it.each(['1', '2.5', '3'])('should be free (value = %s)', (value) => {
      const book = new Book(new Money(value));

      const { total, salesTaxes } = book.applyTaxes(BasicSalesTax);

      expect(total).toStrictEqual(new Money(value));
      expect(salesTaxes).toStrictEqual(Money.ZERO);
    });

    it('should be free on multiple items', () => {
      const basket = new ShopppingBasket([new Book(new Money('12.49')), new Book(new Money('12.49'))]);

      const { total, salesTaxes } = basket.applyTaxes(BasicSalesTax);

      expect(total).toStrictEqual(new Money('24.98'));
      expect(salesTaxes).toStrictEqual(Money.ZERO);
    });
  });

  describe('on music CDs', () => {
    it.each([
      ['10', '11'],
      ['25', '27.5'],
      ['100', '110'],
      ['14.99', '16.49'],
    ])('should be 10\%, (value = %s, expected = %s)', (money, expected) => {
      const cd = new MusicCD(new Money(money));

      const { total, salesTaxes } = cd.applyTaxes(BasicSalesTax);

      expect(total).toStrictEqual(new Money(expected));
      expect(salesTaxes).toStrictEqual(new Money(expected - money));
    });

    it('should sum all taxed music CDs (10\%)', () => {
      const books = new ShopppingBasket([
        new MusicCD(new Money('14.99')),
        new MusicCD(new Money('12.49')),
      ]);

      const { total, salesTaxes } = books.applyTaxes(BasicSalesTax);
      expect(total).toStrictEqual(new Money(14.99 * 1.1 + 12.49 * 1.1));
      expect(salesTaxes).toStrictEqual(new Money(14.99 * 0.1 + 12.49 * 0.1));
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

      const { total, salesTaxes } = book.applyTaxes(ImportDutyTax);

      expect(total).toStrictEqual(new Money(expected));
      expect(salesTaxes).toStrictEqual(new Money(expected - money));
    });

    it('should sum all taxed books (5\%)', () => {
      const books = new ShopppingBasket([
        new Book(new Money('11.5'), true),
        new Book(new Money('12.35'), true),
      ]);

      const { total, salesTaxes } = books.applyTaxes(ImportDutyTax);

      const firstTaxed = new Money('12.1');
      const secondTaxed = new Money('13');
      expect(total).toStrictEqual(firstTaxed.add(secondTaxed));
      expect(salesTaxes).toStrictEqual(new Money(1.25));
    });
  });

  describe('on not imported books', () => {
    it.each(['10', '10.5', '1', '1.05', '147', '154.35'])('should be free with (value = %s)', (money) => {
      const book = new Book(new Money(money), false);

      const { total, salesTaxes } = book.applyTaxes(ImportDutyTax);

      expect(total).toStrictEqual(new Money(money));
      expect(salesTaxes).toStrictEqual(Money.ZERO);
    });

    it('should sum all books applying import duty taxes only on imported books', () => {
      const books = new ShopppingBasket([
        new Book(new Money('12.55'), true),
        new Book(new Money('20.1'), false),
      ]);

      const { total, salesTaxes } = books.applyTaxes(ImportDutyTax);

      const firstTaxed = new Money('12.55').multiply(new Money('1.05')).roundTo05();
      const secondTaxFree = new Money('20.1');
      expect(total).toStrictEqual(firstTaxed.add(secondTaxFree));
      expect(salesTaxes).toStrictEqual(firstTaxed.subtract(new Money('12.55')));
    });
  });
});

describe('import duty taxes and basic sales taxes together', () => {
  describe('on generic product', () => {
    it('should have both taxes applied and round to .05', () => {
      const product = new GenericProduct(new Money('47.50'), true);

      const { total, salesTaxes } = product.applyTaxes(AllTaxes);

      expect(total).toStrictEqual(new Money('54.65'));
      expect(salesTaxes).toStrictEqual(new Money(54.65 - 47.50));
    });
  });
});
