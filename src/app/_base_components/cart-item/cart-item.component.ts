import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {CartItem} from "../../models/cartItem";
import {ShoppingCart} from "../../models/shoppingCart";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent
{
  id:any;

}

