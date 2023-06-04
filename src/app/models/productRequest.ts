import {User} from "./user";
import {Product} from "./product";

export class productRequest{
  id: number;
  quantityNeeded: number;
  user: User;
  product: Product;
}
