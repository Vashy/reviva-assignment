
export class ShopppingBasket {
  constructor(productList) {
    if (!Array.isArray(productList)) {
      throw new Error(`Invalid type of productList: ${productList}. It should be an array`);
    }
    this.productList = productList;
  }

  applyTaxes(taxes) {
    return this.productList
      .map(item => item.applyTaxes(taxes))
      .reduce((acc, current) => ({
        taxedValue: acc.taxedValue.add(current.taxedValue),
        appliedTaxes: acc.appliedTaxes.add(current.appliedTaxes),
      }));
  }
}
