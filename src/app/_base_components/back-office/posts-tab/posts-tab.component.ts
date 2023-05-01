import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Post} from "../../../models/post";
import {ForumService} from "../../../_services/forum.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-posts-tab',
  templateUrl: './posts-tab.component.html',
  styleUrls: ['./posts-tab.component.scss']
})
export class PostsTabComponent implements OnInit{
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  postForm: FormGroup;
  files: FileList;
  public post:Post[]=[];
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private userService: UserService, private httpClient: HttpClient , private fb: FormBuilder,private forumService : ForumService , private routers: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.userService.getAllMods().subscribe(res =>{
      this.users=res
      console.log(this.users)

    })
    this.postForm = this.fb.group({
      postTitle: '',
      body: ''
    });
    this.user= this.userService.getCurrentUser()
    this.forumService.GetPosts()
      .subscribe(res=>{
        this.post = res;
        console.log(this.post)
      })




  }
  onFileSelected(event): void {
    this.files = event.target.files;
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

}
