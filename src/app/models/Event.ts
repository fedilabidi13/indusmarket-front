import {Media} from "./media";
import {Address} from "./adresse";
import {User} from "./user";
import {Ticket} from "./Ticket";
export class Event{
  id!:number;
  title!:string;
  description!:string;
  startDate!:string;
  endDate!:string;
  adresse!:string;
  accepted!:boolean;
  medias!:Media[];
  price!:number;
  addres!:Address;
  user!:User;
  tickets!:Ticket[];
}
