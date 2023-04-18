import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Claims} from "../models/Claims";
import {map} from "rxjs";
import {Shop} from "../models/shop";
import {UserService} from "./user.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  token!:string;
  user!:User;
  constructor( private http : HttpClient,private userService : UserService) { }
  getEvents(){
    return this.http.get<Event[]>("http://localhost:8085/events/showEvents")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  getUserEvents(){
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<Event[]>("http://localhost:8085/events/ShowEventbyUser",{headers})
      .pipe(map((res:any)=>{
        return res;
      }))
  }
}
