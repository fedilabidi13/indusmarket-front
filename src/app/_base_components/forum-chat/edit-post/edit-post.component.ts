import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "../../../_services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../models/post";
import {ForumService} from "../../../_services/forum.service";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit{
  post: Post;
files: FileList;
error: string;

constructor(private route: ActivatedRoute, private forumService: ForumService) { }

ngOnInit() {

}

onFileSelect(event) {
  this.files = event.target.files;
}

onSubmit() {
  this.forumService.updatePost(this.post,this.post.id, this.files).subscribe(
    post => {
      console.log(post);
      window.location.reload();
      // Handle success scenario here
    },
    error => {
      this.error = error;
      console.log(error);
    }
  );
}
}
