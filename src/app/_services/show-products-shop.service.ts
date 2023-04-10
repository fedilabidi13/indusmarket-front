import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { map } from 'rxjs/operators';
import {ShowShopsService} from "./show-shop.service";
import {Shop} from "../models/shop";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ShowProductsShopService {
  private shopId: number;



  constructor(private http : HttpClient) { }

  getProduct(id:any): Observable<Product[]>{
    const url = "http://localhost:8085/shop/findAllProducts/"+id;
    return this.http.get<Product[]>(url);
  }
}
