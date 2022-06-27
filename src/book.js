import { Money } from "./money";
import { ImportDutyTaxes } from "./taxes";

export class Book {
  productType = 'books';

  constructor(money, imported = false) {
    if (!(money instanceof Money)) {
      throw new Error(`Invalid type of money: ${money}. Expected: Money`);
    }
    this.money = money;
    this.imported = imported;
  }

  applyTaxes(taxes) {
    if (taxes instanceof ImportDutyTaxes)
      return taxes.apply(this);
    return this.money;
  }
}

export class Books {
  productType = 'books';

  constructor(list) {
    if (!Array.isArray(list)) {
      throw new Error(`Invalid type of book list: ${list}`);
    }
    this.list = list;
  }

  applyTaxes(taxes) {
    return this.list
      .map(item => item.applyTaxes(taxes))
      .reduce((acc, current) => acc.add(current));
  }
}
