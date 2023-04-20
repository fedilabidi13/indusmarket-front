import {Component, OnInit} from '@angular/core';
import { CartItemService } from "../../_services/cart-item.service";
import { CartItem} from "../../models/cartItem";
import {ShoppingCartService} from "../../_services/shopping-cart.service";
import {Product} from "../../models/product";
import {Claims} from "../../models/Claims";
import {ShoppingCart} from "../../models/shoppingCart";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public cartItems:CartItem[]=[];
  shoppingCart: ShoppingCart;



  constructor(private shoppingCartService : ShoppingCartService) {}


  ngOnInit(): void {
    this.shoppingCartService.getAllCartItems()
      .subscribe(res=>{
        this.cartItems = res;
        console.warn(this.cartItems)
      })

  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const cartItem of this.shoppingCart.cartItemList) {
      totalPrice += cartItem.product.price * cartItem.quantity;
    }
    return totalPrice;
  }


}
