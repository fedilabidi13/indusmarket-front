import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import {ShoppingCart} from "../../models/shoppingCart";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  created = true;
  not_created = true;
  message!: String;
  constructor(private userService:UserService){}

  register(registerForm: NgForm){
    this.userService.register(registerForm.value).subscribe(
      (response)=>{
        this.created=false;
        this.message=response
        const shoppingCartJSON = localStorage.getItem('shoppingCart');

      },
      (error)=>{
        console.log(error);
        this.not_created=false;
        this.message=error;
        this.created=true;


            }

    );
}
}
