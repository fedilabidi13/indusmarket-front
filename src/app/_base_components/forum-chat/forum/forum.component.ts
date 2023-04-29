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
  selectedPost : Post = new Post();
  user!:User;
  @Input() indicators = true;
  @Input() controls = true;
  posts : Post = new Post();
  postId: number;
  commentForm: FormGroup;
  files: FileList;
  reactType: string;
  react: React;
  public allcomments:any[] = [];

  constructor(private forumService : ForumService , private router:Router ,private userService: UserService , private routers: ActivatedRoute ,private fb: FormBuilder ) {
  }
  ngOnInit(): void {


    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;

        res.forEach((element)=>
        {
          this.allcomments.push(this.getComments(element.id))
        })


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

  }

  onFileSelected(event): void {
    this.files = event.target.files;
  }


///////Post CRUD
  showPost(id:number){
    this.router.navigate(['forum/post-details/'+id])

  }
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
  initPostUpdate()
  {
    const element = document.getElementById('postId')as HTMLInputElement | null;
    this.forumService.getpostByiD(element.value).subscribe(response =>
    {
      this.selectedPost.postTitle = response.postTitle;
      this.selectedPost.id = response.id;
      this.selectedPost.body = response.body;
      this.selectedPost.medias = response.medias;
      this.selectedPost.user = response.user;
      this.selectedPost.createdAt = response.createdAt

    })
  }
  updatePost()
  {

    return this.forumService.addPost(this.selectedPost).subscribe(
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



  //////Comment CRUD
  getComments(id: number){
    return this.forumService.getComments(id)
      .subscribe(res=>{
        this.comment = res;



      });

  }

  protected readonly Post = Post;


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
        window.location.reload();
      }
    );
  }

  ////React CRUD
  addReactToPost(id: number ,reactType: string): void {
    this.forumService.addReactToPost(id, reactType).subscribe(react => {
      console.log(`Added ${react.react} reaction to post ${react.post.id}`);
      // You could also update the UI to show the new reaction here
    });
  }

}
