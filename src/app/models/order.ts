import { OrdersStatus } from "./enumerations/ordersStatus";
import {User} from "./user";
import {CartItem} from "./cartItem";
import {Product} from "./product";

export class Orders {
  id: number;
  user: User;
  totalAmount: number;
  paid: boolean;
  ordersStatus: OrdersStatus;
  creationDate: Date;
  secondCartItemList: CartItem[];
  dilevryAdresse: string;
  Product:Product[];
}

