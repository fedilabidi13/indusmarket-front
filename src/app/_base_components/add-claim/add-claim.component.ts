import { Component } from '@angular/core';
import {Media} from "../../models/media";
import {User} from "../../models/user";
import {Event} from "../../models/Event";
import {UserService} from "../../_services/user.service";
import {NgForm} from "@angular/forms";
import {ClaimService} from "../../_services/claim.service";
import {Claims} from "../../models/Claims";
import {ClaimsComponent} from "../claims/claims.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-claim',
  templateUrl: './add-claim.component.html',
  styleUrls: ['./add-claim.component.scss']
})
export class AddClaimComponent {
  file: Media[] = [];
  user!: User;
  claim: Claims = new Claims(); // define an empty Event object
  mediaList: Media[] = []; // define an empty array of Media objects
  selectedFiles: File[] = [];

  onFileSelected(event): void {
    this.selectedFiles = event.target.files;
  }
  constructor(private claimService: ClaimService, private userService: UserService) {}


  onSubmit(claimForm: NgForm) {
    const formData = new FormData();
    formData.append('title', this.claim.title);
    formData.append('description', this.claim.description);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file', this.selectedFiles[i]);
    }
    this.claimService.addClaim(formData, this.mediaList).subscribe(
      (response) => {
        console.log('Claim added successfully!');
        // Add any additional code to handle success here
        claimForm.reset(); // reset the form after successful submission
        this.claim = new Claims(); // reset the Event object
        this.mediaList = []; // reset the Media list
        window.location.reload()
        Swal.fire('Success!', 'Claim added successfully!', 'success')

      },
      (error) => {
        console.log('Error adding claim: ', error);
        // Add any additional code to handle error here
        Swal.fire('Success!', 'Claim added successfully!', 'success')
      }
    );
  }
}
