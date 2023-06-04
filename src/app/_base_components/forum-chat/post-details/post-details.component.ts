import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../../../_services/forum.service";
import {Post} from "../../../models/post";
import {UserService} from "../../../_services/user.service";
import {User} from "../../../models/user";
import {PostComment} from "../../../models/postComment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {React} from "../../../models/react";
import {Media} from "../../../models/media";

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit{
  selectedCommentId!: number;
  selectedPost : Post = new Post();
  selectedComment : PostComment = new PostComment();

  itemId: string;
  post : Post = new Post();
  user!: User;
  commentForm: FormGroup;
  files: FileList;
  public comment:PostComment[]=[];
  comments : PostComment = new PostComment();
  commentId: number;
  reactType: string;
  message !: string;
  errormessage = true;
  public replies:PostComment[]=[];
  public postd:Post[]=[];



  public listComment = [];
  public react:React[]=[];
  @Input() indicators = true;
  @Input() controls = true;
  posts : Post = new Post();
  postId: number;
  reacts: React;
  public allcomments:any[] = [];
  public allreacts:any[] = [];
  nbr_like : number;
  nbr_dislike : number;
  nbr_love : number;
  nbr_sad : number;
  nbr_angry : number;
  nbr_laugh : number;
  nbr_wow : number;
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isImageModalOpen = false;
  showText = false;
  constructor(private route: ActivatedRoute, private forumService: ForumService, private userService: UserService,
              private fb: FormBuilder , private router:Router , private routers: ActivatedRoute ,
            ) { }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      commentBody: '',
    });
    this.user= this.userService.getCurrentUser()
    this.routers.paramMap.subscribe(params => {
      this.commentId = +params.get('commentId');
    });
    this.commentId = this.route.snapshot.params['commentId'];


    this.user = this.userService.getCurrentUser()
    this.itemId = this.route.snapshot.paramMap.get('id');
    console.warn(this.itemId)
    this.forumService.getpostByiD(this.itemId).subscribe(response =>
    {
      this.post.postTitle = response.postTitle;
      this.post.id = response.id;
      this.post.body = response.body;
      this.post.medias = response.medias;
      this.post.user = response.user;
      this.post.createdAt = response.createdAt
      this.forumService.getCommentsByPostId(this.post.id).subscribe((next)=>
      {
        this.listComment=next

        console.warn(next);
        console.warn(this.listComment);
      })
    })

    console.log(this.post)


  }




  selectCommentId(comment : any)
  {
    this.selectedComment.id= comment.id;
    console.warn(this.selectedComment.id)
  }
  addComments(): void {

    this.forumService.addComment(this.commentForm.value, this.itemId, this.files).subscribe(
      response => {
        //window.location.reload();
        // Do something with the response, e.g. redirect to the new post's page
      },
      error => {
        console.log(error)
        //window.location.reload()
        // Handle any errors that occurred during the POST request
      }
    );
  }

  addComments2(): void {
    const element = document.getElementById('postId')as HTMLInputElement | null;
    const comment: PostComment = this.commentForm.value;
    this.forumService.addCommentReply(this.selectedCommentId,comment, this.files).subscribe(
      response => {

        console.log(
          response
        )
              // Do something with the response, e.g. redirect to the new post's page
      },
      error => {
        console.log(error)

        // Handle any errors that occurred during the POST request
      }
    );
  }
  onFileSelected(event): void {
    this.files = event.target.files;
  }
  showPost(id:number){
    this.router.navigate(['forum/post-details/'+id])

  }
  deleteComment(commentId: number) {
    this.forumService.DeleteComment(commentId).subscribe(() => {
        // Update the posts array after successful deletion
        this.comment = this.comment.filter(comment => comment.id !== commentId);
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
  initCommentUpdate()
  {
    console.warn(this.selectedComment.id)
    this.forumService.getcommentByiD(this.selectedComment.id).subscribe(response =>
    {
      this.selectedComment.commentBody = response.commentBody;
      this.selectedComment.id = response.id;
      this.selectedComment.medias = response.medias;
      this.selectedComment.user = response.user;
      this.selectedComment.commentedAt = response.commentedAt
      console.log(this.selectedComment)

    })
  }
  updateComment()
  {

    return this.forumService.updateComment(this.selectedComment ,this.selectedComment.id, this.files).subscribe(
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
  deletePost(postId: number) {
    this.forumService.DeletePost(postId).subscribe(() => {
        // Update the posts array after successful deletion
        this.postd = this.postd.filter(post => post.id !== postId);
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
  getReacts(id: number){
    this.nbr_like=0;
    this.nbr_dislike=0;
    this.nbr_love=0;
    this.nbr_sad=0;
    this.nbr_angry=0;
    this.nbr_laugh=0;
    this.nbr_wow=0;

    this.forumService.getReacts(id)
      .subscribe(res=>{
        this.react = res;


        console.warn('/////////////////////////////')
        console.warn(this.react)
        for (let i=0; i<this.react.length; i++)
        {
          console.log(this.react[i].type)
          if (this.react[i].type.startsWith('LIKE'))
          {
            console.log('found match')
            this.nbr_like++;
          }
          if (this.react[i].type.startsWith('DISLIKE'))
          {
            console.log('found match')
            this.nbr_dislike++;
          }
          if (this.react[i].type.startsWith('LOVE'))
          {
            console.log('found match')
            this.nbr_love++;
          }
          if (this.react[i].type.startsWith('SAD'))
          {
            console.log('found match')
            this.nbr_sad++;
          }
          if (this.react[i].type.startsWith('ANGRY'))
          {
            console.log('found match')
            this.nbr_angry++;
          }
          if (this.react[i].type.startsWith('LAUGH'))
          {
            console.log('found match')
            this.nbr_laugh++;
          }
          if (this.react[i].type.startsWith('WOW'))
          {
            console.log('found match')
            this.nbr_wow++;
          }
        }
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
  public closeImageModal(): void {
    this.isImageModalOpen = false;
    this.selectedMedia = null;
  }

  public onPreviousClick(comment : PostComment): void {
    if (this.selectedMediaIndex > 0) {
      this.selectedMediaIndex--;
      this.selectedMedia = comment.medias[this.selectedMediaIndex];
    }
  }

  public onNextClick(comment :PostComment): void {
    if (this.selectedMediaIndex < comment.medias.length - 1) {
      this.selectedMediaIndex++;
      this.selectedMedia = comment.medias[this.selectedMediaIndex];
    }
  }

  public onImageClick(medias: any[]): void {
    this.selectedMediaIndex = 0;
    this.selectedMedia = medias[0];
    this.isImageModalOpen = true;
  }




  protected readonly localStorage = localStorage;
}
