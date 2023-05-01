import {User} from "./user";
import {Event} from "./Event";
import {Media} from "./media";
export class Ticket{
  id!:number;
  reference!:string;
  descreption!:string;
  user!:User;
  event!:Event;
  media!:Media;
}
