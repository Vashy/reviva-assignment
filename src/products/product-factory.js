import { Book } from "./book.js";
import { Food } from "./food.js";
import { MusicCD } from "./cd.js";
import { GenericProduct } from "./generic-product.js";
import { Multiple } from "./multiple-product.js";
import { Money } from "../money.js";
import { ShopppingBasket } from "../shopping-basket";
import { MedicalProduct } from "./medical-product.js";

function shoppingBasketFromJson(jsonInput) {
  const products = JSON.parse(jsonInput);
  return new ShopppingBasket(products.map(product => productFrom(product)));
}

function productFrom({ productType, cost, imported, quantity, description }) {
  const money = new Money(cost);
  let product;
  if (productType === 'books') {
    product = new Book(money, imported, description);
  } else if (productType === 'food') {
    product = new Food(money, imported, description);
  } else if (productType === 'music') {
    product = new MusicCD(money, imported, description);
  } else if (productType === 'medical') {
    product = new MedicalProduct(money, imported, description);
  } else if (productType === 'generic') {
    product = new GenericProduct(money, imported, description);
  } else {
    throw new Error(`type ${productType} not valid`);
  }

  if (quantity > 1) {
    return new Multiple(product, quantity);
  }

  return product;
}

export { shoppingBasketFromJson };
