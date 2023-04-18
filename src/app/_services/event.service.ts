import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Claims} from "../models/Claims";
import {map} from "rxjs";
import {Shop} from "../models/shop";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor( private http : HttpClient) { }
  getEvents(){
    return this.http.get<Event[]>("http://localhost:8085/events/showEvents")
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
