import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { CartItem } from "../models/cartItem";
import {User} from "../models/user";
import {UserService} from "./user.service";
import {Claims} from "../models/Claims";


@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  private  cartItemUrl = "http://localhost:8085/cartItem";
  private user: User;
  private token: string;
  private quantity: number=1;
  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {
    this.user = this.userService.getCurrentUser();
    this.token = localStorage.getItem('currentUser');
  }
  addAndAssignToCart(productId: number, quantity : number): Observable<string> {
    const url = `${this.cartItemUrl}/add`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<string>(url, { productId, quantity }, { headers });
  }

  updateCartItemQuantity(cartItemId: number, counterValue: number): Observable<void> {
    const url = `${this.cartItemUrl}/updateCartItemQuantity?cartItemId=${cartItemId}&counterValue=${counterValue}`;
    const token = localStorage.getItem('currentUser');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put<void>(url, {}, { headers });
  }

  deleteCartItemAndRemoveFromCart(cartItemId: number): Observable<void> {
    const url = `${this.cartItemUrl}/deleteCartItemAndRemoveFromCart?idCartItem=${cartItemId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(url, { headers });
  }


  getCartItemById(idCartItem: number): Observable<CartItem> {
    const url = `${this.cartItemUrl}/AfficherCartItem?idCartItem=${idCartItem}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<CartItem>(url, { headers });
  }

}



