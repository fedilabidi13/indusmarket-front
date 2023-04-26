import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ForumService} from "../../../_services/forum.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../models/post";
import {MatDialog} from "@angular/material/dialog";
import {PostComment} from "../../../models/postComment";
import {UserService} from "../../../_services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {React} from "../../../models/react";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit{
  public post:Post[]=[];
  public comment:PostComment[]=[];
  selectedPostId!: number;
  user!:User;
  indexImage:any=0;
  public indexImageP:object={};
  @Input() indicators = true;
  @Input() controls = true;
  totalPost:any;
  posts : Post = new Post();
  postId: number;
  commentForm: FormGroup;
  files: FileList;
  reactType: string;
  react: React;
  posth: Post;
  public allcomments:any[] = [];

  constructor(private forumService : ForumService , private router:Router ,private userService: UserService , private routers: ActivatedRoute ,private fb: FormBuilder ) {
  }
  ngOnInit(): void {


    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;

       /* res.forEach((element)=>
        {
          this.allcomments.push(this.getComments(element.id))
        })

        */


      });


    this.routers.paramMap.subscribe(params => {
      this.postId = +params.get('id');
    });
    this.commentForm = this.fb.group({
      commentBody: '',
    });
    this.user= this.userService.getCurrentUser()
    this.routers.paramMap.subscribe(params => {
      this.postId = +params.get('postId');
    });
    console.warn(this.post)

  }


  getComments(id: number){
    return this.forumService.getComments(id)
      .subscribe(res=>{
        this.comment = res;



      });

  }

  protected readonly Post = Post;
  // Function to delete a post
  deletePost(postId: number) {
    this.forumService.DeletePost(postId).subscribe(() => {
      // Update the posts array after successful deletion
      this.post = this.post.filter(post => post.id !== postId);
      //this.router.navigate(['/forumDetails']).then(r => )
    },
      error => {
      window.location.reload();
      });
  }

  onPrevClick(idImage: number,longeur:number):void{
    if(this.indexImage===0){
    }else {
      this.indexImage--;
    }
  }
  onNextClick(idImage:number,longeur:number ):void {
    if (this.indexImage === longeur - 1) {
      this.indexImage = 0;
    } else {
      this.indexImage++;
    }
  }
  selectImage(idImage:number,index: number):void{

    this.indexImage=index;
  }
  onFileSelected(event): void {
    this.files = event.target.files;
  }

  addComments(): void {
    const element = document.getElementById('postId')as HTMLInputElement | null;
    const comment: PostComment = this.commentForm.value;
    this.forumService.addComment(comment,element.value, this.files).subscribe(
      response => {
        window.location.reload();
        // Do something with the response, e.g. redirect to the new post's page
      },
      error => {
        // Handle any errors that occurred during the POST request
      }
    );
  }

  addReactToPost(like: string, id: number): void {
    this.forumService.addReactToPost(this.posth.id, this.reactType).subscribe(react => {
      console.log(`Added ${react.react} reaction to post ${react.post.id}`);
      // You could also update the UI to show the new reaction here
    });
  }
}
