import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API="http://localhost:8085";
  requestHeader = new HttpHeaders({ "No-Auth": "True"});
  constructor(private httpClient:HttpClient) {
   }

  public register(registerData: any){
    return this.httpClient.post(this.PATH_OF_API+"/auth/register",registerData,);
  }
}
