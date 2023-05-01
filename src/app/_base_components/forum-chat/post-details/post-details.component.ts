import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ForumService} from "../../../_services/forum.service";
import {Post} from "../../../models/post";
import {UserService} from "../../../_services/user.service";
import {User} from "../../../models/user";
import {PostComment} from "../../../models/postComment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {React} from "../../../models/react";

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



  public listComment = [];
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

    //get comment reply
    const commentId = 123;
    this.forumService.getCommentReplies(commentId)
      .subscribe(replies => {
        this.replies = replies;
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
  loadReplies(comment: any)
  {
    let res : any[] = [];
     this.forumService.getCommentReplies(comment).subscribe(
      (next)=>
      {
        res= next;
      }
    )
    return res;

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
  addReactToPost(id: number ,reactType: string): void {
    this.forumService.addReactToPost(id, reactType).subscribe(react => {
      localStorage.setItem(`post_${id}_react`, reactType);

      // You could also update the UI to show the new reaction here
    });
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


  protected readonly localStorage = localStorage;
}
