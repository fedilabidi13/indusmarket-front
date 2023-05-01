import {Component, Input} from '@angular/core';
import {Media} from "../../models/media";
import {User} from "../../models/user";
import {Claims} from "../../models/Claims";
import {ClaimService} from "../../_services/claim.service";
import {UserService} from "../../_services/user.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-post-claim',
  templateUrl: './add-post-claim.component.html',
  styleUrls: ['./add-post-claim.component.scss']
})
export class AddPostClaimComponent {
@Input() postId : number
  file: Media[] = [];
  user!: User;
  claim: Claims = new Claims(); // define an empty Event object
  mediaList: Media[] = []; // define an empty array of Media objects
  selectedFiles: File[] = [];

  onFileSelected(event): void {
    this.selectedFiles = event.target.files;
  }
  constructor(private claimService: ClaimService, private userService: UserService,private route: ActivatedRoute) {}
ngOnInit(){
  this.postId = this.route.snapshot.params['postId'];

}
  onSubmit(claimForm: NgForm) {
    console.log(this.postId);
    const formData = new FormData();
    formData.append('title', this.claim.title);
    formData.append('description', this.claim.description);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file', this.selectedFiles[i]);
    }
    this.claimService.addPostClaim(formData, this.mediaList,this.postId).subscribe(
      (response) => {
        console.log('Claim added successfully!');
        // Add any additional code to handle success here
        claimForm.reset(); // reset the form after successful submission
        this.claim = new Claims(); // reset the Event object
        this.mediaList = []; // reset the Media list
      },
      (error) => {
        console.log('Error adding claim: ', error);
        // Add any additional code to handle error here
      }
    );
  }
}
