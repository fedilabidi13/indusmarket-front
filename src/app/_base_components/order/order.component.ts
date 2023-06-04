import {Component, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Orders} from "../../models/order";
import {ShoppingCartNoUserComponent} from "../shopping-cart-no-user/shopping-cart-no-user.component";
import {OrderService} from "../../_services/order.service";
import {User} from "../../models/user";
import {UserService} from "../../_services/user.service";
import {Product} from "../../models/product";
import {EventService} from "../../_services/event.service";
import {Event} from "../../models/Event";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../payment/payment.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  spring_url: string = 'http://localhost:8085/checkout?orderId='
  orders: Orders[] = [];
  currentUser: User;
  products: Product[];
  orderId: number;
  public events:Event[]=[];
  showProducts: boolean = false;
  checkoutForm: FormGroup;
  private token!: string;
  spring_url_safe: SafeResourceUrl;
  order: Orders;

  @Input() id;
  @Input() nombre;
  @Input() descripcion;
  @Input() precio;




  constructor( private sanitizer : DomSanitizer,    private paymentService: PaymentService, private fb: FormBuilder, private eventService:EventService,private http: HttpClient,private orderService: OrderService, private userService: UserService) {
    this.checkoutForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expiryMonth: ['', Validators.required],
    expiryYear: ['', Validators.required],
    cvc: ['', Validators.required],
    amount: ['', Validators.required],
  });}

  ngOnInit(): void {

    this.currentUser = this.userService.getCurrentUser();
    this.spring_url_safe = this.sanitizer.bypassSecurityTrustUrl(this.spring_url);


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


  onSubmit() {
    const formData = this.checkoutForm.value;
    this.orderService.charge(formData).subscribe((data) => {
      console.log(data);
      // handle success response
    }, (error) => {
      console.error(error);
      // handle error response
    });
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

  getOrderById(orderId: number) {
    this.orderService.getOrderById(orderId).subscribe(
      data => {
        this.order = data;
      },
      error => console.log(error)
    );
  }


  confirmar(id: string): void {
  }

  cancelar(id: string): void {

  }


  protected readonly ShoppingCartNoUserComponent = ShoppingCartNoUserComponent;
}
