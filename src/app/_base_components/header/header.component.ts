import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user";
import jwt_decode from "jwt-decode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  user!:User;
  constructor(private userService:UserService, private router: Router){
    this.user=this.userService.getCurrentUser();
  }

  ngOnInit(): void {

    console.log("hrkzlejr");
    console.log(this.user.id);

  }
  account()
  {
    if (localStorage.getItem('currentUser')!= null)
    {
      this.router.navigate(['/profile'])
    }
    else {
      this.router.navigate(['/login'])
    }
  }


}
