import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  created = true;
  not_created = true;
  message!: String;
  user !: User;

  constructor(private userService:UserService){}
  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response)=>{
        this.created=false;
        this.message=response;
        this.not_created=true;
        const token = response;
        const decodedJwt: any = jwt_decode(token);
        const username = decodedJwt.sub;

      },
      (error)=>{
        console.log(error);
        this.not_created=false;
        this.message=error;
        this.created=true;
            }

    );
}

}


