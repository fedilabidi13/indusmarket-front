import {CartItem} from "./cartItem";

export class ShoppingCart {
  id: number;
  cartItemList: CartItem[];

  constructor(id: number, cartItemList: CartItem[]) {
    this.id = id;
    this.cartItemList = cartItemList;
  }
}
