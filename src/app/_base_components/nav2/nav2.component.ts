import { Component } from '@angular/core';
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.scss']
})
export class Nav2Component {
  constructor(private userService: UserService) {
  }
  logout()
  {
    this.userService.logout()
  }
}
