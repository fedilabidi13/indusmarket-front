import {Component, OnInit} from '@angular/core';
import {Post} from "../../../models/post";
import {ForumService} from "../../../_services/forum.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  post: Post = new Post();
  errorMessage: string = 'null';
  fileToUpload: File | null = null;
  imagenMin!: File;

  constructor(private cs: ForumService, private router: Router) {
  }


}
