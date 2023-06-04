import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ForumService} from "../../../_services/forum.service";
import {Post} from "../../../models/post";
import {FormBuilder, FormGroup} from "@angular/forms";
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
  errorMessage: string = 'null';

  constructor(private userService:UserService, private fb: FormBuilder,private forumService : ForumService) {
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
        this.errorMessage = 'Post Added successfully';
      window.location.reload();
      },
      error => {
        if (error?.status === 424) {
          this.errorMessage = 'Bad Word used';
        }
      }

    );
  }

}
