import {Component, Input, OnInit} from '@angular/core';
import { CartItemService} from "../../_services/cart-item.service";
import { CartItem} from "../../models/cartItem";
import {ShoppingCartService} from "../../_services/shopping-cart.service";
import {Product} from "../../models/product";
import {Claims} from "../../models/Claims";
import {ShoppingCart} from "../../models/shoppingCart";
import {ShoppingCartNoUserComponent} from "../shopping-cart-no-user/shopping-cart-no-user.component";
import {ActivatedRoute} from "@angular/router";
import {ShowProductsShopService} from "../../_services/show-products-shop.service";
import {ShowShopsService} from "../../_services/show-shop.service";
import {ProductComponent} from "../shop-module/product/product.component";
import {OrderService} from "../../_services/order.service";
import {Orders} from "../../models/order";
import {HttpClient} from "@angular/common/http";
import {OrderComponent} from "../order/order.component";


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public cartItems:CartItem[]=[];
  shoppingCart: ShoppingCart;
  recommendedProduct!: Product;
  Orders!: Orders;





  constructor(private shoppingCartService : ShoppingCartService  ,private http: HttpClient ,private cartItemService:CartItemService , private orderService: OrderService) {}
  public indexImage:object={};

  ngOnInit(): void {
    this.recommendProduct();
    this.shoppingCartService.getAllCartItems()
      .subscribe(res=>{
        this.cartItems = res;
        console.warn(this.cartItems)
      })
  }

  onDeleteCartItem(cartItemId: number): void {
    this.cartItemService.deleteCartItemAndRemoveFromCart(cartItemId).subscribe(
      () => {
        // Handle success
        console.log(`Cart item ${cartItemId} has been deleted.`);
        // You can update the cart items list after the item has been deleted
        this.shoppingCartService.getAllCartItems();
        location.reload();
      }
    );
  }

  getTotalItems(): number {
    let totalItems = 0;
    for (const cartItem of this.cartItems) {
      totalItems += cartItem.quantity;
    }
    return totalItems;
  }


  recommendProduct() {
    this.shoppingCartService.recommendProduct().subscribe(
      (data: Product) => {
        this.recommendedProduct = data;
        console.log('Recommended Product:', this.recommendedProduct);
      },
      error => {
        console.log('Error:', error);
      }
    );
  }


  onCreateOrder(): void {
    this.orderService.createOrder().subscribe(
      (order: Orders) => {
        console.log('Order created successfully:', order);
        // Handle successful order creation here, such as displaying a success message or navigating to a confirmation page.

      },
      (error) => {
        console.error('Error creating order:', error);
        // Handle error creating order here, such as displaying an error message or logging the error.
      }
    );
  }

  protected readonly ShoppingCartNoUserComponent = ShoppingCartNoUserComponent;
  protected readonly ProductComponent = ProductComponent;
}
