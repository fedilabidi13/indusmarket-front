import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Claims} from "../models/Claims";
import {map, Observable} from "rxjs";
import {Shop} from "../models/shop";
import {UserService} from "./user.service";
import {User} from "../models/user";
import {Event} from "../models/Event";
import {Media} from "../models/media";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8085/events'; // Replace with your API endpoint
  event!:Event;
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

  addEvent(formData: FormData, mediaList: Media[]): Observable<Event> {
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post<Event>(`${this.apiUrl}/addEvent`, formData, { headers });
  }
}
