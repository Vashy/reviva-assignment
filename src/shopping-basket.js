
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
        total: acc.total.add(current.total),
        salesTaxes: acc.salesTaxes.add(current.salesTaxes),
      }));
  }

  getReceiptDetails(taxes) {
    const { total, salesTaxes } = this.applyTaxes(taxes);
    const products = this.productList.map(product => product.getDetails(taxes));

    return { total, salesTaxes, products };
  }
}
