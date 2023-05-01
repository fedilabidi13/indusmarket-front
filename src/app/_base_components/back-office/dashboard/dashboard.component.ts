import { Component } from '@angular/core';
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private userService: UserService) {
  }
  logout(){
    this.userService.logout()
  }

}
