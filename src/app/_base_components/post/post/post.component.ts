import { Component } from '@angular/core';
import {Post} from '../../../models/post';
import {PostService} from "../../../_services/post.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  post: Post = new Post();
  errorMessage: string = 'null';
  fileToUpload: File | null = null;
  constructor(private cs: PostService, private router: Router) {
  }

  addPost() {
    this.cs.addPost(this.post).subscribe(() => this.router.navigateByUrl('/forum'));
    console.log(this.post.postTitle);
  }
  ngOnInit(): void {
  }

  addnewpost() {
    this.cs.addPost(this.post).subscribe(data => {
        this.post = data ,
          console.log(data);
        this.errorMessage = 'valide'; },
      err => {
        if (err?.status === 424) {
          this.errorMessage = 'Bad Word used';
        } else if (err?.status === 400) {
          this.errorMessage = 'Email already exists';
        }
      }

    );
  }



}
