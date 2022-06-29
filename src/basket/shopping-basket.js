export class ShopppingBasket {
  constructor(productList, taxes) {
    if (!Array.isArray(productList)) {
      throw new Error(`Invalid type of productList: ${productList}. It should be an array`);
    }
    this.productList = productList;
    this.taxes = taxes;
  }

  applyTaxes() {
    return this.productList
      .map(item => item.applyTaxes(this.taxes))
      .reduce((acc, current) => ({
        total: acc.total.add(current.total),
        salesTaxes: acc.salesTaxes.add(current.salesTaxes),
      }));
  }

  getReceiptDetails() {
    const { total, salesTaxes } = this.applyTaxes(this.taxes);
    const products = this.productList.map(product => product.getDetails(this.taxes));

    return { total, salesTaxes, products };
  }

  getReceiptDetailsAsString(taxes) {
    const { total, products, salesTaxes } = this.getReceiptDetails(taxes);
    const lines = products.map(details => detailsToString(details));
    lines.push('Sales Taxes: ' + salesTaxes.toString());
    lines.push('Total: ' + total.toString());
    return lines.join('\n');
  }
}

function detailsToString(details) {
  return `${details.quantity} ` +
    `${details.product.imported ? 'imported ' : ''}` +
    `${details.product.description}: ` +
    `${details.total}`;
}
