import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../_services/user.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ForumService} from "../../../_services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../models/user";

@Component({
  selector: 'app-reacts-tab',
  templateUrl: './reacts-tab.component.html',
  styleUrls: ['./reacts-tab.component.scss']
})
export class ReactsTabComponent implements OnInit{
  files: FileList;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private userService: UserService, private httpClient: HttpClient , private fb: FormBuilder,private forumService : ForumService , private routers: ActivatedRoute ) {
  }

  ngOnInit(): void {}
  onFileSelected(event): void {
    this.files = event.target.files;
  }
}
