import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Orders} from "../../models/order";
import {ShoppingCartNoUserComponent} from "../shopping-cart-no-user/shopping-cart-no-user.component";
import {OrderService} from "../../_services/order.service";
import {User} from "../../models/user";
import {UserService} from "../../_services/user.service";
import {Product} from "../../models/product";
import {EventService} from "../../_services/event.service";
import {Event} from "../../models/Event";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  orders: Orders[] = [];
  currentUser: User;
  products: Product[];
  orderId: number;
  public events:Event[]=[];
  showProducts: boolean = false;








  constructor(private eventService:EventService,private http: HttpClient,private orderService: OrderService, private userService: UserService) {}

  ngOnInit(): void {

    this.currentUser = this.userService.getCurrentUser();



    this.eventService.getEvents()
      .subscribe(res=>{
        this.events = res;
        console.log(this.events)
      })




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

      this.orderService.deleteOrder(orderId).subscribe((res) => {
window.location.reload()
        },
        error => {
        console.warn(error)

        });
  }



  fetchProducts(orderId : number): void {
    this.orderService.getProductsForOrder(orderId)
      .subscribe(products => {
        this.products = products;
        this.showProducts = !this.showProducts;

      });
  }


  protected readonly ShoppingCartNoUserComponent = ShoppingCartNoUserComponent;
}
