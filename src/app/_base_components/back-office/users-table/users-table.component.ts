import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  providers: [DatePipe]
})
export class UsersTableComponent implements OnInit{
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
        this.userService.getAllUsers().subscribe(res =>{
          this.users=res
          console.log(this.users)

        })
    }
}
