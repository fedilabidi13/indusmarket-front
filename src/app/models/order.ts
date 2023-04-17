import { OrdersStatus } from "./enumerations/ordersStatus";

export class Claims {
  id!: number;
  totalAmount!: number;
  paid!: boolean;
  ordersStatus!: OrdersStatus[];
  creationDate!:Date;
  dilevryAdresse!:string;

}
