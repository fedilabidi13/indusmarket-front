import {Component, OnInit} from '@angular/core';
import {PostComment} from "../../../models/postComment";
import {User} from "../../../models/user";
import {ForumService} from "../../../_services/forum.service";
import {Router} from "@angular/router";
import {Post} from "../../../models/post";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit{
  postForm: FormGroup;
  files: FileList;
  user!:User;
  public post:Post[]=[];
  constructor(private userService:UserService, private fb: FormBuilder,private forumService : ForumService , private router:Router , private http:HttpClient ) {
  }
  ngOnInit(): void {
    this.postForm = this.fb.group({
      postTitle: '',
      body: ''
    });
    this.user= this.userService.getCurrentUser()
  }

  onFileSelected(event): void {
    this.files = event.target.files;
  }

  onSubmit(): void {
    const post: Post = this.postForm.value;
    this.forumService.addPost(post, this.files).subscribe(
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
}
