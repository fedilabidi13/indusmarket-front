import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';
import { User } from '../models/user';
import jwt_decode from "jwt-decode";
import {ProcessHTTPMsgService} from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API="http://localhost:8085";
  requestHeader = new HttpHeaders({ "No-Auth": "True"});

  helper = new JwtHelperService();
  user!: Observable<User> ;
  user2 !: User;
  errMsg!: string;

  constructor(private httpClient:HttpClient) {
  }

  public register(registerData: any){
    return this.httpClient.post(this.PATH_OF_API+"/auth/register",registerData,{ responseType: 'text' });
  }
  public login(loginData: any){
    return this.httpClient.post(this.PATH_OF_API+"/auth/authenticate",loginData,{ responseType: 'text' });
  }
  getUser(email: string): Observable<User>{
     return this.httpClient.get<User>(this.PATH_OF_API + "/auth/get?email=" + email).pipe();
  }
  getCurrentUser() {
    const token = localStorage.getItem('currentUser');
    if (token!=null)
    {
      const decodedJwt: any = jwt_decode(token);
      const email = decodedJwt.sub;

      this.getUser(email).subscribe({
        next: (user) => {
           console.log(user);
           this.user2=user;
        },error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('Complete');
        },
      });


      console.log(email);
      console.log(this.user2);

    }
    return this.user2;
  }

}
