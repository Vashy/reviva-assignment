import { Book } from "./book.js";
import { Food } from "./food.js";
import { MusicCD } from "./music-cd.js";
import { GenericProduct } from "./generic-product.js";
import { Multiple } from "./multiple-product.js";
import { Money } from "../money/money.js";
import { ShopppingBasket } from "../basket/shopping-basket.js";
import { MedicalProduct } from "./medical-product.js";
import { BOOKS, FOOD, GENERIC, MEDICAL, MUSIC } from "./product.types.js";

function shoppingBasketFromJson(jsonInput, taxes) {
  const products = JSON.parse(jsonInput);
  const productList = products.map(product => productFrom(product));
  return new ShopppingBasket(productList, taxes);
}

function productFrom({ productType, cost, imported, quantity, description }) {
  const money = new Money(cost);
  let product;
  if (productType === BOOKS) {
    product = new Book(money, imported, description);
  } else if (productType === FOOD) {
    product = new Food(money, imported, description);
  } else if (productType === MUSIC) {
    product = new MusicCD(money, imported, description);
  } else if (productType === MEDICAL) {
    product = new MedicalProduct(money, imported, description);
  } else if (productType === GENERIC) {
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
