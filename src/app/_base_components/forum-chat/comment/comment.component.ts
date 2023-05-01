import {Component, OnInit} from '@angular/core';
import {PostComment} from "../../../models/postComment";
import {User} from "../../../models/user";
import {ForumService} from "../../../_services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../_services/user.service";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  public post:Post[]=[];
  public comment:PostComment[]=[];
  postId: number;

  user!:User;
  constructor(private forumService : ForumService , private router: ActivatedRoute ,private userService: UserService ) {
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.postId = +params.get('id');
      this.getComments();
    });
  }

  getComments(): void {
    this.forumService.getComments(this.postId)
      .subscribe(comments => this.comment = comments);
  }


}
