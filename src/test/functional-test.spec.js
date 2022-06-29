import { Book } from "../products/book.js";
import { MusicCD } from "../products/cd.js";
import { Food } from "../products/food.js";
import { GenericProduct } from "../products/generic-product.js";
import { Money } from "../money.js";
import { Multiple } from "../products/multiple-product.js";
import { ShopppingBasket } from "../shopping-basket.js";
import { BasicSalesTax, ImportDutyTaxes, Taxes } from "../taxes/taxes.js";
import { shoppingBasketFromJson } from "../products/product-factory.js";
import { fixture } from "./fixture.js";

describe('Acceptance Criteria', () => {
  it('Problem Input 1', async () => {
    const jsonInput = await fixture('input-1.json');

    const result = shoppingBasketFromJson(jsonInput).getReceiptDetailsAsString(new BasicSalesTax()) + '\n';

    const expectedOutput = await fixture('output-1.txt');
    expect(result).toStrictEqual(expectedOutput);
  });

  it('Problem Input 2', async () => {
    const jsonInput = await fixture('input-1.json');

    const result = shoppingBasketFromJson(jsonInput).getReceiptDetailsAsString(new BasicSalesTax()) + '\n';

    const expectedOutput = await fixture('output-1.txt');
    expect(result).toStrictEqual(expectedOutput);
  });
});

describe('ShoppingBasket', () => {
  it('Problem Input 1', () => {
    const basket = new ShopppingBasket([
      new Multiple(new Book(new Money('12.49')), 2),
      new MusicCD(new Money('14.99')),
      new Food(new Money('0.85')),
    ]);

    const { salesTaxes, total, products } = basket.getReceiptDetails(new BasicSalesTax());

    expect(salesTaxes).toStrictEqual(new Money('1.50'));
    expect(total).toStrictEqual(new Money('42.32'));
    expect(products).toContainEqual({ product: new Book(new Money('12.49')), quantity: 2, total: new Money('24.98') });
    expect(products).toContainEqual({ product: new MusicCD(new Money('14.99')), quantity: 1, total: new Money('16.49') });
    expect(products).toContainEqual({ product: new Food(new Money('0.85')), quantity: 1, total: new Money('0.85') });
  });

  it('Problem Input 2', () => {
    const basket = new ShopppingBasket([
      new Food(new Money('10'), true),
      new GenericProduct(new Money('47.50'), true),
    ]);

    const { salesTaxes, total, products } = basket.getReceiptDetails(new Taxes(new BasicSalesTax(), new ImportDutyTaxes()));

    expect(salesTaxes).toStrictEqual(new Money('7.65'));
    expect(total).toStrictEqual(new Money('65.15'));
    expect(products).toContainEqual({ product: new Food(new Money('10'), true), quantity: 1, total: new Money('10.50') });
    expect(products).toContainEqual({ product: new GenericProduct(new Money('47.50'), true), quantity: 1, total: new Money('54.65') });
  });

  it('Problem Input 3', () => {
    const basket = new ShopppingBasket([
      new GenericProduct(new Money('27.99'), true, 'bottle of perfume'),
      new GenericProduct(new Money('18.99'), false, 'bottle of perfume'),
      new Food(new Money('9.75'), false), // headache pills
      new Multiple(new Food(new Money('11.25'), true), 3), // chocolate
    ]);

    const { salesTaxes, total, products } = basket.getReceiptDetails(new Taxes(new BasicSalesTax(), new ImportDutyTaxes()));

    expect(salesTaxes).toStrictEqual(new Money('7.90'));
    expect(total).toStrictEqual(new Money('98.38'));
    expect(products).toContainEqual({ product: new GenericProduct(new Money('27.99'), true, 'bottle of perfume'), quantity: 1, total: new Money('32.19') });
    expect(products).toContainEqual({ product: new GenericProduct(new Money('18.99'), false, 'bottle of perfume'), quantity: 1, total: new Money('20.89') });
    expect(products).toContainEqual({ product: new Food(new Money('9.75'), false), quantity: 1, total: new Money('9.75') });
    expect(products).toContainEqual({ product: new Food(new Money('11.25'), true), quantity: 3, total: new Money('35.55') });
  });
});
