import {Component, OnInit} from '@angular/core';
import { CartItemService } from "../../_services/cart-item.service";
import { CartItem} from "../../models/cartItem";
import {ShoppingCartService} from "../../_services/shopping-cart.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[];




  constructor(private shoppingCartService : ShoppingCartService) {}

  ngOnInit() {

    this.shoppingCartService.getAllCartItems().subscribe((data) => {
      this.cartItems = data;
    });
  }
}
