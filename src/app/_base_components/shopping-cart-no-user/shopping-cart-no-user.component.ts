import { Component, OnInit } from '@angular/core';
import {ShoppingCart} from "../../models/shoppingCart";
import {CartItem} from "../../models/cartItem";

@Component({
  selector: 'app-shopping-cart-no-user',
  templateUrl: './shopping-cart-no-user.component.html',
  styleUrls: ['./shopping-cart-no-user.component.scss']
})
export class ShoppingCartNoUserComponent {
  shoppingCart: ShoppingCart;
  cartItems: CartItem[];



  ngOnInit(): void {
    this.shoppingCart = this.loadShoppingCart();
    this.cartItems = this.shoppingCart.cartItemList;
  }

  loadShoppingCart(): ShoppingCart {
    const shoppingCartJson = localStorage.getItem('shoppingCart');
    if (shoppingCartJson) {
      return JSON.parse(shoppingCartJson);
    } else {
      const myShoppingCart = new ShoppingCart(1, []);
      return myShoppingCart;
    }
  }
  getTotalPrice(): number {
    let totalPrice = 0;
    for (const cartItem of this.shoppingCart.cartItemList) {
      totalPrice += cartItem.product.price * cartItem.quantity;
    }
    return totalPrice;
  }

  removeCartItem(cartItem: CartItem): void {
    const index = this.shoppingCart.cartItemList.indexOf(cartItem);
    if (index !== -1) {
      this.shoppingCart.cartItemList.splice(index, 1);
      const shoppingCartJson = JSON.stringify(this.shoppingCart);
      localStorage.setItem('shoppingCart', shoppingCartJson);
    }
  }


}
