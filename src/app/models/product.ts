import {Category} from "./enumerations/Category";
import {Media} from "./media";
import {Shop} from "./shop";
import {Orders} from "./order";

export class Product{
  idProduct!:number;
  reference!:string;
  order!:Orders[];
  name!:string;
  quantity!:number;
  price!:number;
  description!:string;
  discount!:number;
  PriceAfterDiscount!:number;
  brand!:string;
  category!:Category;
  barcodeImage!:Media;
  medias!:Media[];
  status!:string;
  validated: boolean;
  shop:Shop;}
