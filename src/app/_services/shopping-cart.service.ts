
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ShoppingCart} from "../models/shoppingCart";
import {CartItem} from "../models/cartItem";
import {User} from "../models/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  token!:string;
  user!:User;
  private apiUrl = 'http://localhost:8085/shoppingCart/load-items';
  constructor(private userService : UserService , private http : HttpClient) { }


  public getAllCartItems(): Observable<CartItem[]> {
    this.user=this.userService.getCurrentUser()
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<CartItem[]>('http://localhost:8085/shoppingCart/load-items',{headers : headers}).pipe(map((res:any)=>{
      return res;

    }));
  }


}



