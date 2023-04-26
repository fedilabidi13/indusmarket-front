import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../models/user";
import {Post} from "../../../models/post";
import {ForumService} from "../../../_services/forum.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PostComment} from "../../../models/postComment";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit{
  commentForm: FormGroup;
  files: FileList;
  user!:User;
  public comment:PostComment[]=[];

  constructor( private fb: FormBuilder,private forumService : ForumService , private router:Router , private http:HttpClient ) {
  }
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      commentBody: '',
    });
  }

  onFileSelected(event): void {
    this.files = event.target.files;
  }

  /*addComments(): void {
    const comment: PostComment = this.commentForm.value;
    this.forumService.addComment(comment, this.files).subscribe(
      response => {
        console.log(response);
        window.location.reload();
        // Do something with the response, e.g. redirect to the new post's page
      },
      error => {
        console.log(error);
        // Handle any errors that occurred during the POST request
      }
    );
  }

   */
}
