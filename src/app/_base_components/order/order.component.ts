import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Orders} from "../../models/order";
import {ShoppingCartNoUserComponent} from "../shopping-cart-no-user/shopping-cart-no-user.component";
import {OrderService} from "../../_services/order.service";
import {User} from "../../models/user";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orders: Orders[] = [];
  currentUser: User;




  constructor(private http: HttpClient,private orderService: OrderService, private userService: UserService) {}

  ngOnInit(): void {

    this.currentUser = this.userService.getCurrentUser();

    this.http.get<Orders[]>('http://localhost:8085/order').subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error(error);
      }
    );


      this.orderService.getAllOrders().subscribe(
        (data: Orders[]) => {
          this.orders = data;
        },
        error => {
          console.log(error);
        }
      );
    }

  getUnpaidOrdersCount(): number {
    let count = 0;
    for (const order of this.orders) {
      if (!order.paid) {
        count++;
      }
    }
    return count;
  }


  onDeleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(
        () => {
          console.log(`Order ${orderId} has been deleted.`);
          this.orders = this.orders.filter(order => order.id !== orderId);
        },
        error => {
          console.error(error);
        }
      );
    }
  }





  protected readonly ShoppingCartNoUserComponent = ShoppingCartNoUserComponent;
  }
