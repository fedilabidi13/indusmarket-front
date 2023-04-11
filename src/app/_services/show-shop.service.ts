import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Shop} from "../models/shop";

@Injectable({
  providedIn: 'root'
})

export class ShowShopsService {
  private shopId: number;
  averageRating = 0;

  constructor(private http : HttpClient) { }
  getShops(){
    return this.http.get<Shop[]>("http://localhost:8085/shop/findAll")
      .pipe(map((res:any)=>{
        return res;
      }))
  }


}
