import { Component } from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login-back',
  templateUrl: './login-back.component.html',
  styleUrls: ['./login-back.component.scss']
})
export class LoginBackComponent {
  created = true;
  not_created = true;
  message!: string;
  user !: User;

  constructor(private userService:UserService, private router: Router){

  }
  login(loginForm: NgForm){
    this.userService.login(loginForm.value).subscribe(
      (response)=>{
        this.message=response;
        console.log('le message')
        console.log(this.message)

        if (this.message.startsWith("ey"))
        {
          localStorage.removeItem('currentUser')
          localStorage.setItem('currentUser',this.message);
          this.user = this.userService.getCurrentUser();
          console.warn("new logged in user")
          console.warn(this.user)


          if (this.user.role.startsWith('U')) {
            this.message = "you are not permitted to access such area !"
            this.created = false;
            this.not_created = true;
          }

          if (this.user.role.startsWith('M') ){
            localStorage.setItem('currentUser',this.message);
            this.router.navigate(['/back-office/mod/dashboard']);
          }
          if (this.user.role.startsWith('A') ){
            localStorage.setItem('currentUser',this.message);
            this.router.navigate(['/back-office/dashboard']);
          }

        }
        if (this.message.includes("First Attempt detected"))
        {
          this.router.navigate(['/back-office/mod-confirm'])
        }
        this.created=false;
        this.not_created=true;
      },
      error => {
        this.not_created =  false;
      }
    );

  }


}
