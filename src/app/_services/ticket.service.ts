import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Claims} from "../models/Claims";
import {map} from "rxjs";
import {Ticket} from "../models/Ticket";
import {Event} from "../models/Event";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  private apiUrl = 'http://localhost:8085/tickets';
  token!:string;
  user!:User;
  constructor(private userService : UserService , private http : HttpClient,private router : Router) { }

  GetUserTickets(){
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Ticket[]>("http://localhost:8085/tickets/showUserTickets", { headers : headers })
      .pipe(map((res:any)=>{
        return res;
      }));
  }
  Partipate(eventId : number){
    this.user=this.userService.getCurrentUser()

    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<Ticket>(`${this.apiUrl}/addTicket/${eventId}`,{}, { headers : headers });
  }
  deleteTicket(id:number){
    const url = `http://localhost:8085/tickets/delete/${id}`;
    return this.http.delete(url);
  }
}
