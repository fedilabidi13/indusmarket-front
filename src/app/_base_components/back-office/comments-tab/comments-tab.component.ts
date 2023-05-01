import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Post} from "../../../models/post";
import {UserService} from "../../../_services/user.service";
import {HttpClient} from "@angular/common/http";
import {ForumService} from "../../../_services/forum.service";
import {ActivatedRoute} from "@angular/router";
import {PostComment} from "../../../models/postComment";

@Component({
  selector: 'app-comments-tab',
  templateUrl: './comments-tab.component.html',
  styleUrls: ['./comments-tab.component.scss']
})
export class CommentsTabComponent implements OnInit{
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  commentForm: FormGroup;
  files: FileList;
  public comment:PostComment[]=[];
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private userService: UserService, private httpClient: HttpClient , private fb: FormBuilder,private forumService : ForumService , private routers: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.userService.getAllMods().subscribe(res =>{
      this.users=res
      console.log(this.users)

    })
    this.commentForm = this.fb.group({
      commentBody: '',
    });





  }
  onFileSelected(event): void {
    this.files = event.target.files;
  }


  deleteComment(commentId: number) {
    this.forumService.DeleteComment(commentId).subscribe(() => {
        // Update the posts array after successful deletion
        this.comment = this.comment.filter(comment => comment.id !== commentId);
        //this.router.navigate(['/forumDetails']).then(r => )
      },

      error => {
        window.location.reload();
      });
  }


}
