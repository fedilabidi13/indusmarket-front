import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ForumService} from "../../../_services/forum.service";
import {PostComment} from "../../../models/postComment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit{
  public postComment:PostComment[]=[];
  user!:User;
  constructor(private forumService : ForumService) {
  }
  ngOnInit(): void {
    this.forumService.getCommentsByPostId(6)
      .subscribe(res=>{
        this.postComment = res;
        console.log(this.postComment)
      })

  }
  // getCommentsByPostId(postId: number) {
  //   this.forumService.getCommentsByPostId(postId)
  //     .subscribe(
  //       data => {
  //         this.postComment = data;
  //       },
  //       error => {
  //         console.log('Une erreur s\'est produite : ', error);
  //       }
  //     );
  // }

  public selectedMedia: any; // Store the selected media object
  public isImageModalOpen: boolean = false; // Track if the image modal is open

  // Handle image click event
  public onImageClick(media: any): void {
    this.selectedMedia = media; // Store the selected media object
    this.isImageModalOpen = true; // Open the image modal
  }

  // Close the image modal
  public closeImageModal(): void {
    this.isImageModalOpen = false; // Close the image modal
    this.selectedMedia = null; // Clear the selected media object
  }
  showText: boolean = false; // Define a boolean flag to control the visibility of the "Show" text



}
