import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user!: User;
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')===null)
    {
      this.router.navigate(['/login'])
    }
  }
}
