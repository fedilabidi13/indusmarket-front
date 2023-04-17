import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Post} from "../../../models/post";
import {PostComment} from "../../../models/postComment";
import {Router} from "@angular/router";
import {ForumService} from "../../../_services/forum.service";
import {User} from "../../../models/user";

@Component({
  selector: 'app-forum-details',
  templateUrl: './forum-details.component.html',
  styleUrls: ['./forum-details.component.scss']
})
export class ForumDetailsComponent implements OnInit{
  public post:Post[]=[];
  user!:User;
  constructor(private forumService : ForumService , private router:Router) {
  }
  ngOnInit(): void {
    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;
        console.log(this.post)
      })

  }

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


  protected readonly Post = Post;
  // Function to delete a post
  deletePost(postId: number) {
    this.forumService.DeletePost(postId).subscribe(() => {
      // Update the posts array after successful deletion
      this.post = this.post.filter(post => post.id !== postId);
      //this.router.navigate(['/forumDetails']).then(r => )
      window.location.reload();
    });
  }
}
