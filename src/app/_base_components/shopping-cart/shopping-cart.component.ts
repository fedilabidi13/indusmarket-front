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

  public productList: Product[] = [];
  p: number = 1;
  itemsPerPage: number = 6;
  totalShop: any;
  selectedIndex = 0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  @Input() product: Product;
  shoppingCart: ShoppingCart;
  quantity = 1;
  errorMessage: string;

  public cartItems:CartItem[]=[];
  recommendedProduct!: Product;
  Orders!: Orders;
  selectedProduct: any;










  constructor( private  api:ShowProductsShopService,private shoppingCartService : ShoppingCartService  , private ShowProductsShopService: ShowProductsShopService,private http: HttpClient ,private cartItemService:CartItemService , private orderService: OrderService) {}
  public indexImage:object={};
  id:any;


  ngOnInit(): void {



    this.recommendProduct();
    this.shoppingCartService.getAllCartItems().subscribe(res => {
      // Filter out any duplicate cart items
      const filteredItems = res.filter((item, index, self) =>
        index === self.findIndex((t) => t.product.idProduct === item.product.idProduct)
      );

      // Update cart item quantity for any duplicates
      res.forEach((item) => {
        const duplicateItem = filteredItems.find((t) => t.product.idProduct === item.product.idProduct && t.id !== item.id);
        if (duplicateItem) {
          const updatedQuantity = item.quantity + duplicateItem.quantity;
          this.cartItemService.updateCartItemQuantity(item.id, updatedQuantity).subscribe();
        }
      });

      this.cartItems = filteredItems;
    });


    setInterval(() => {
      this.recommendProduct();
    }, 10000);


  }

  showProductDetails(item: any) {
    this.selectedProduct = item;
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
    return this.cartItems.length;
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


  updateCartItemQuantity(cartItemId: number, counterValue: number) {
    this.cartItemService.updateCartItemQuantity(cartItemId, counterValue).subscribe(
      (response) => {
        console.log('Cart item quantity updated:', response);
        // Update the cart items in the component after successful update
        this.shoppingCartService.getAllCartItems();
      },
      (error) => {
        console.error('Error updating cart item quantity:', error);
      }
    );
  }


  addProductToCartfromSuggetion(productId: number, quantity: number) {
    this.api.addAndAssignToCart(productId, quantity=1).subscribe(
      (response) => {
        console.log('New cart item created:', response);
        this.errorMessage = 'Post Added successfully';
        window.location.reload();

      })}



  protected readonly ShoppingCartNoUserComponent = ShoppingCartNoUserComponent;
}
