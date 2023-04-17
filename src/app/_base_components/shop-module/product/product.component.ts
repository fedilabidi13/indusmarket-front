import {Component, Input, OnInit} from '@angular/core';
import {ShowShopsService} from "../../../_services/show-shop.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ShowProductsShopService} from "../../../_services/show-products-shop.service";
import { CartItemComponent } from "../../cart-item/cart-item.component";
import {ShoppingCart} from "../../../models/shoppingCart";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";
import {Product} from "../../../models/product";
import {CartItem} from "../../../models/cartItem";

@Component({
  selector: 'app-prod',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  public productList:Product[]=[];
  p:number = 1;
  itemsPerPage:number =6;
  totalShop:any;
  selectedIndex =0;
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;
  @Input() product: Product;
  shoppingCart: ShoppingCart;
  quantity = 1

  public addToCart( item: any ): void {
    const cartItem = new CartItem(item.idProduct, 1, item, this.loadShoppingCart());
    this.shoppingCart.cartItemList.push(cartItem);

    // Store the shopping cart in local storage
    const shoppingCartJson = JSON.stringify(this.shoppingCart);
    localStorage.setItem('shoppingCart', shoppingCartJson);
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






  public indexImage:object={};
  constructor(private ac:ActivatedRoute,private api:ShowProductsShopService,private api1:ShowShopsService){
    this.shoppingCart = this.loadShoppingCart();

  }
  routeSub: Subscription;
  id:any;
  messageSuccess:string="";
  ngOnInit():void{
    this.routeSub = this.ac.params.subscribe((params: Params) => {
      this.id = params['id'];

    });

    this.api.getProduct(this.id)
      .subscribe(res=>{
        this.productList = res;
        for(let shop of this.productList){

          this.indexImage[shop.idProduct]=0;
        }
        console.log(this.productList)
      })
  }

  selectImage(idImage:number,index: number):void{
    this.indexImage[idImage]=index;
  }

  onPrevClick(idImage: number,longeur:number):void{
    if(this.indexImage[idImage]===0){
    }else {
      this.indexImage[idImage]--;
    }
  }
  onNextClick(idImage:number,longeur:number ):void{
    if(this.indexImage[idImage] === longeur -1){
      this.indexImage[idImage] = 0;
    }else{
      this.indexImage[idImage]++;
    }
  }


    addRating(rateValue){
    console.log(rateValue);
      this.messageSuccess="Shop Rated Successfully";
    this.api.addRating(this.id,rateValue).subscribe((data)=>
    {

      setTimeout(()=>{
        this.messageSuccess=""
      },3000)
      console.log(data)})
    }



}
