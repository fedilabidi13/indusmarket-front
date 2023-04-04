import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.scss']
})
export class ProfileBadgeComponent implements OnInit{
  user !: User;
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.user=this.userService.getCurrentUser()
    console.log(this.user)
  }

}
