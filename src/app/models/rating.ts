import {Shop} from "./shop";
import {User} from "./user";

export class Rating{
  id!:number;
  value!:number;
  ratedAt!:Date;
  shop!:Shop;
  user!:User;
}
