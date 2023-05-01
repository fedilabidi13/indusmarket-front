import {Product} from "./product";
import {ShoppingCart} from "./shoppingCart";
import {Media} from "./media";
export class CartItem {
  id: number;
  quantity: number;
  product: Product;
  shoppingCart: ShoppingCart;

  constructor(id: number, quantity: number, product: Product, shoppingCart: ShoppingCart) {
    this.id = id;
    this.quantity = quantity;
    this.product = product;
    this.shoppingCart = shoppingCart;
  }
}
