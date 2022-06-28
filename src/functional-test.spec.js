import { Book } from "./book";
import { MusicCD } from "./cd";
import { ChocolateBar } from "./food";
import { Money } from "./money";
import { Multiple } from "./multiple-product";
import { ShopppingBasket } from "./shopping-basket";
import { BasicSalesTax } from "./taxes";

describe('basic sales taxes', () => {
  describe('Problem Input 1', () => {
    it('TODO', () => {
      const basket = new ShopppingBasket([
        new Multiple(new Book(new Money('12.49')), 2),
        new MusicCD(new Money('14.99')),
        new ChocolateBar(new Money('0.85')),
      ]);

      const { salesTaxes, total, products } = basket.getReceiptDetails(new BasicSalesTax());

      expect(salesTaxes).toEqual(new Money('1.50'));
      expect(total).toEqual(new Money('42.32'));
      expect(products).toContainEqual({ product: new Book(new Money('12.49')), quantity: 2 });
      expect(products).toContainEqual({ product: new MusicCD(new Money('16.49')), quantity: 1 });
      expect(products).toContainEqual({ product: new MusicCD(new Money('16.49')), quantity: 1 });
    });
  });
});
