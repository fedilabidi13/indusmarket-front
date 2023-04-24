import {Media} from "./media";

export class Event{
  id!:number;
  title!:string;
  description!:string;
  startDate!:Date;
  endDate!:Date;
  adresse!:string;
  accepted!:boolean;
  medias!:Media[];
  price!:number;
}
