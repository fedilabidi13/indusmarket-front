import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Orders} from "../models/order";
import {CartItem} from "../models/cartItem";
import {UserService} from "./user.service";
import {User} from "../models/user";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8085/order/add';
  private  orderUrl = "http://localhost:8085/order";

  private token!: string;
  user!:User;



  constructor(private http: HttpClient, private userService : UserService, ) { }

  getCurrentUser(): User {
    return this.userService.getCurrentUser();
  }

  public createOrder(): Observable<Orders> {
    this.token = localStorage.getItem('currentUser')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<Orders>(this.apiUrl, {}, { headers });
  }


  deleteOrder(orderId: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<void>(`http://localhost:8085/order/delete?orderId=${orderId}`, {  }, {headers: headers});
  }


  public getAllOrders():  Observable<Orders[]> {
    this.user=this.userService.getCurrentUser()
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Orders[]>('http://localhost:8085/order/orderList', {headers: headers});

    };


  getProductsForOrder(orderId: number): Observable<Product[]> {
    this.user = this.userService.getCurrentUser()
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Product[]>(`http://localhost:8085/order/TheOrder?orderId=${orderId}`, {}, {headers: headers});
  }



}
