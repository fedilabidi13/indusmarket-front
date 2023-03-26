import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})


export class RegisterComponent {
  created = true;
  constructor(private userService:UserService){}

  register(registerForm: NgForm){
    this.userService.register(registerForm.value).subscribe(
      (response)=>{
        console.log(response);
        this.created=false;
      }, 
      (error)=>{
        console.log(error);
        this.created=false;
      }

    );
}
}
