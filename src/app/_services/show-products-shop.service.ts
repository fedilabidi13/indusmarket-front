import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {ShowShopsService} from "./show-shop.service";
import {Shop} from "../models/shop";
import {Observable} from "rxjs";
import {Product} from "../models/product";
import {Rating} from "../models/rating";

@Injectable({
  providedIn: 'root'
})
export class ShowProductsShopService {
  private shopId: number;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json','Authorization':""})
  }


  constructor(private http : HttpClient) { }

  getProduct(id:any): Observable<Product[]>{
    const url = "http://localhost:8085/shop/findAllProducts/"+id;
    return this.http.get<Product[]>(url);
  }
  getProd(){
    return this.http.get<Product[]>("http://localhost:8085/product/ShowAllProductsForUser")
      .pipe(map((res:any)=>{
        return res;
      }))
  }


  addRating(shopId,rateValue){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + localStorage.getItem("currentUser")
      })
    }
    const url = "http://localhost:8085/rating/add/"+shopId+"/"+rateValue;
    return this.http.post<Rating>(url, {},this.httpOptions);
  }

  deleteProduct(id:any){
    return this.http.delete("http://localhost:8085/product/delete/"+id)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
