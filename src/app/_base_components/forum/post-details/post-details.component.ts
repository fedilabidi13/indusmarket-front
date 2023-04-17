import {Component, OnInit} from '@angular/core';
import {ForumService} from "../../../_services/forum.service";
import {Params, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PostComment} from "../../../models/postComment";
import {Post} from "../../../models/post";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  constructor(
    private service: ForumService,
    private router: Router,
    http: HttpClient) {
  }
  comment: PostComment = new PostComment();
  comm2: PostComment = new PostComment();
  comment2: PostComment = new PostComment();


  postid!: string;
  routeSub!: Subscription;
  post1!: Post;
  ngOnInit(): void {


  }
  getpostDetails(id: string): void {
    this.routeSub = this.service
      .getpostByiD(id)
      .subscribe(p => {
        this.post1 = p;
      });
  }
  addComment(id: string) {
    this.service.addCommentPst(id, this.comment).subscribe(p => {
      console.log(this.comment);
      this.getpostDetails(this.postid);
    });
  }
  addCommentReply(id: string) {
    this.service.addCommentReply(id, this.comment).subscribe(p => {
      console.log(this.comment);
      this.getpostDetails(this.postid);
    });
  }
  openCom(cc: PostComment): void {
    this.comm2 = cc;
  }

  UpdateComm(id: string) {
    this.service.UpdateCom(id, this.comment2).subscribe(p => {
      console.log(this.comment2);
      let currentUrl = this.router.url;

      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    });
  }
  deleteCom(id: string) {
    this.service.DeleteCom(id).subscribe(p => {
      console.log('delete');
      this.getpostDetails(this.postid);

    });
  }
  deletePost(id: string) {
    this.service.DeletePost(Number(id)).subscribe(p => {
      console.log('delete');

    });
    this.router.navigate(['user/forum']).then(() => {
      window.location.reload();
    });

  }
  UpdatePost(id: string) {
    if (this.post1.body === ''){this.post1.body = this.post1.body; }
    this.service.UpdatePost(id, this.post1).subscribe(p => {
      console.log(this.post1);
      let currentUrl = this.router.url;

      this.router.navigate([currentUrl]).then(() => {
        window.location.reload();
      });
    });
  }

}
