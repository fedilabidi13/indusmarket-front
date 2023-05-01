import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Orders} from "../models/order";
import {CartItem} from "../models/cartItem";
import {UserService} from "./user.service";
import {User} from "../models/user";

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
    const url = `${this.orderUrl}/delete?orderId=${orderId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<void>(url, { headers });
  }


  public getAllOrders():  Observable<Orders[]> {
    this.user=this.userService.getCurrentUser()
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Orders[]>('http://localhost:8085/order/orderList', {headers: headers});

    };


}
