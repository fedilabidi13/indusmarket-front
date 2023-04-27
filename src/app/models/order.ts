import { OrdersStatus } from "./enumerations/ordersStatus";
import {User} from "./user";
import {CartItem} from "./cartItem";

export class Orders {
  id: number;
  user: User;
  totalAmount: number;
  paid: boolean;
  ordersStatus: OrdersStatus;
  creationDate: Date;
  secondCartItemList: CartItem[];
  dilevryAdresse: string;
}

