import { Book } from "./book";
import { Money } from "./money";
import { BasicSalesTax } from "./taxes";

describe('book', () => {
  it.each(['5', '6.5', '17.45'])('should have value %s', (value) => {
    const book = new Book(new Money(value));

    const result = book.money;

    expect(result).toEqual(new Money(value));
  });

  it.each(['3', '6', '17.1'])('should have no basic sales taxes, value %s', (value) => {
    const book = new Book(new Money(value));

    const result = book.applyTaxes(new BasicSalesTax());

    expect(result).toEqual(new Money(value));
  });

  it('should fail when value is not Money', () => {
    expect(() => new Book('a')).toThrow(new Error('Invalid type of money: a. Expected: Money'));
    expect(() => new Book(1)).toThrow(new Error('Invalid type of money: 1. Expected: Money'));
  });

  it('productType should be "books"', () => {
    const book = new Book(new Money(0));

    expect(book.productType).toEqual('books');
  });

  it.each([true, false])('imported should be %s', (imported) => {
    const book = new Book(new Money(0), imported);

    expect(book.imported).toEqual(imported);
  });
});
