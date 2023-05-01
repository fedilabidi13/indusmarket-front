import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, catchError, map, Observable} from 'rxjs';
import { User } from '../models/user';
import jwt_decode from "jwt-decode";
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import {Router} from "@angular/router";
import {plainToClass} from "class-transformer";
import {Media} from "../models/media";
import {Role} from "../models/enumerations/Role";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API="http://localhost:8085";
  requestHeader = new HttpHeaders({ "No-Auth": "True"});

  helper = new JwtHelperService();
  user!: Observable<User> ;
  user2 = new User();
  errMsg!: string;

  constructor(private httpClient:HttpClient, private router:Router) {
    this.user2.id=0;
    this.user2.picture= new Media();


  }

  public register(registerData: any){
    return this.httpClient.post(this.PATH_OF_API+"/auth/register",registerData,{ responseType: 'text' });
  }
  public login(loginData: any){
    return this.httpClient.post(this.PATH_OF_API+"/auth/authenticate",loginData,{ responseType: 'text' });

  }
  getUser(email: string) {
     return this.httpClient.get<User>(this.PATH_OF_API + "/auth/get?email=" + email)

  }
  public getCurrentUser():User{
    const token = localStorage.getItem('currentUser');
    if (token!=null)
    {
      const decodedJwt: any = jwt_decode(token);
      const email = decodedJwt.sub;
      console.log(token);
      this.getUser(email).subscribe(
         user=> {
          console.log(user);
          this.user2.id=user.id
          this.user2.firstName=user.firstName;
          this.user2.lastName=user.lastName;
          this.user2.email=user.email;
          this.user2.phoneNumber=user.phoneNumber;
          this.user2.picture=user.picture;
          console.warn('authhjdsf')
          console.log(user.twoFactorsAuth)
          this.user2.phoneNumberVerif= user.phoneNumberVerif;
         this.user2.twoFactorsAuth= user.twoFactorsAuth.valueOf();
          this.user2=user;
          if (user.role==="MOD")
          {
            this.user2.role="MOD"
          }
          if (user.role==="USER")
          {
            this.user2.role="USER"
          }
          if (user.role==="ADMIN")
          {
            this.user2.role="ADMIN"
          }
          console.error(user.role)
          console.error(user.role)
          if (user.role==="DELIVERY")
          {
            this.user2.role="DELIVERY"
          }





     //     return this.user2;


        } ,(error: any) => {
          console.error(error);
          return this.user2;

        },
        ()=>{
        console.log(this.user2.twoFactorsAuth)
          var x : any = this.user2.twoFactorsAuth;
        console.log(x)
        }
      );


      return this.user2;
    }
    return this.user2;
  }

  public verifyEmail(token: any){
    return this.httpClient.get(this.PATH_OF_API + "/auth/confirm?token=" + token,{ responseType: 'text' });
  }
  public getAllUsers():Observable<User[]>{
    return this.httpClient.get<User[]>(this.PATH_OF_API+"/admin/users?role=USER").pipe();
  }
  public getAllMods():Observable<User[]>{
    return this.httpClient.get<User[]>(this.PATH_OF_API+"/admin/users?role=MOD").pipe();
  }
  public logout(){
    const user = this.getCurrentUser();
    console.log(user)
    if (user.role=="USER")
    {
      localStorage.removeItem('currentUser')
      this.router.navigate(['/'])
    }
    else {
      localStorage.removeItem('currentUser')
      this.router.navigate(['/back-office'])
    }

  }


}
