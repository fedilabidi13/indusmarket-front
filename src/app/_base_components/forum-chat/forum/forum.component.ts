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
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit{
  public post:Post[]=[];
  public comment:PostComment[]=[];
  public react:React[]=[];
  selectedPost : Post = new Post();
  user!:User;
  message !: string;
  errormessage = true;
  @Input() indicators = true;
  @Input() controls = true;
  posts : Post = new Post();
  postId: number;
  commentForm: FormGroup;
  files: FileList;
  reactType: string;
  reacts: React;
  public allcomments:any[] = [];
  public allreacts:any[] = [];

  constructor(private forumService : ForumService , private router:Router ,private userService: UserService , private routers: ActivatedRoute ,private fb: FormBuilder ) {
  }
  ngOnInit(): void {


    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;

        res.forEach((element)=>
        {
          this.allcomments.push(this.getComments(element.id))
          this.allreacts.push(this.getReacts(element.id))

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
      console.log('output of the deleeteeee')
        if(error.error.text.startsWith('You can'))
        {
          this.errormessage = false;
          this.message = error.error.text;
          return;
        }
        window.location.reload();
      });
  }
  initPostUpdate()
  {
    console.warn(this.selectedPost.id)
    this.forumService.getpostByiD(this.selectedPost.id).subscribe(response =>
    {
      this.selectedPost.postTitle = response.postTitle;
      this.selectedPost.id = response.id;
      this.selectedPost.body = response.body;
      this.selectedPost.medias = response.medias;
      this.selectedPost.user = response.user;
      this.selectedPost.createdAt = response.createdAt
      console.log(this.selectedPost)

    })
  }
  getPostId(id: any)
  {
    this.selectedPost.id = id;
  }
  updatePost()
  {

    return this.forumService.updatePost(this.selectedPost ,this.selectedPost.id, this.files).subscribe(
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
  getReacts(id: number){
    return this.forumService.getReacts(id)
      .subscribe(res=>{
        this.react = res;



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
    console.warn(id)
    console.warn(reactType)
    this.forumService.addReactToPost(id, reactType).subscribe(
      (response)=>
      {
        console.log(response);
        // Store the selected react type in local storage
        localStorage.setItem('selectedReactType', reactType);
      },
      error1 => {
        console.error(error1)
      }
    )
  }


}
