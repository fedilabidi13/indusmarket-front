import { Component } from '@angular/core';
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-mods-dashboard',
  templateUrl: './mods-dashboard.component.html',
  styleUrls: ['./mods-dashboard.component.scss']
})
export class ModsDashboardComponent {
  constructor(private userService: UserService) {
  }
  logout()
  {
    this.userService.logout()
  }
}
