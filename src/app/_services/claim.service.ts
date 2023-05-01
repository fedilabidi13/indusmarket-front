import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Claims} from "../models/Claims";
import {StatusClaims} from "../models/enumerations/StatusClaims";
import {Media} from "../models/media";
import {Event} from "../models/Event";

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  token!:string;
  user!:User;
  private baseUrl = 'http://localhost:8085/claims';
  constructor(private userService : UserService , private http : HttpClient) { }

  GetClaims(){
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Claims[]>("http://localhost:8085/claims/claimsForUser",{headers})
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  GetModClaims(){
    return this.http.get<Claims[]>("http://localhost:8085/claims/allClaims")
      .pipe(map((res:any)=>{
        return res;
      }))
  }

  DeleteClaim(id: number) {
    const url = `http://localhost:8085/claims/delete/${id}`;
    return this.http.delete(url);
  }
  claimTreatment(claimId: number, status: StatusClaims): Observable<any> {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `${this.baseUrl}/claimTreatment/${claimId}/${status}`;
    return this.http.put(url, {},{headers});
  }
  addClaim(formData: FormData, mediaList: Media[]): Observable<Claims> {
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<Claims>(`${this.baseUrl}/addClaims`, formData, { headers });
  }
  addPostClaim(formData: FormData, mediaList: Media[],postId : number): Observable<Claims> {
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<Claims>(`${this.baseUrl}/addPostClaims/${postId}`, formData, { headers });
  }
}
