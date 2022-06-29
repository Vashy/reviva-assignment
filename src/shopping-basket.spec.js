import { Book } from "./products/book.js";
import { ShopppingBasket } from "./shopping-basket";
import { Money } from "./money";
import { BasicSalesTax } from "./taxes/taxes.js";
import { MusicCD } from "./products/cd.js";

describe('shopping basket', () => {
  it('should have correct productList type', () => {
    const list = [new Book(new Money('5')), new Book(new Money('6')), new MusicCD(new Money('7.5'))];
    const basket = new ShopppingBasket(list);

    const result = basket.productList;

    expect(result).toBe(list);
  });

  it('should fail when list is not a list', () => {
    expect(() => new ShopppingBasket('a')).toThrow(new Error('Invalid type of productList: a. It should be an array'));
    expect(() => new ShopppingBasket(5)).toThrow(new Error('Invalid type of productList: 5. It should be an array'));
  });

  it('should tax sum of products', () => {
    const list = [new Book(new Money('5')), new MusicCD(new Money('6')), new Book(new Money('7.5'))];
    const basket = new ShopppingBasket(list);

    const { total, salesTaxes } = basket.applyTaxes(BasicSalesTax);

    expect(total).toStrictEqual(new Money(5 + (6 * 1.1) + 7.5));
    expect(salesTaxes).toStrictEqual(new Money(6 * 0.1));
  });
});
