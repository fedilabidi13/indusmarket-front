import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import {ShoppingCart} from "../../models/shoppingCart";
import {CartItemService} from "../../_services/cart-item.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [CartItemService]

})
export class RegisterComponent {
  created = true;
  not_created = true;
  message!: String;

  loading = true;
  constructor(private userService:UserService, private CartItemService: CartItemService){}


  register(registerForm: NgForm){
    this.loading= false;
    this.userService.register(registerForm.value).subscribe(
      (response)=>{
        this.created=false;
        this.loading= true;
        this.message=response
        const shoppingCartJSON = localStorage.getItem('shoppingCart');


        if (shoppingCartJSON) {

          const localStorageCart = JSON.parse(shoppingCartJSON);
          for (const cartItem of localStorageCart.cartItemList) {
            this.CartItemService.addAndAssignToCart(cartItem.product, cartItem.quantity);
          }


          localStorage.removeItem('shoppingCart');
        }
      },
      (error)=>{
        console.log(error);
        this.not_created=false;
        this.message=error;
        this.created=true;
        this.loading= true;

            }

    );
}
}
