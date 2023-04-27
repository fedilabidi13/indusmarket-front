import {Component} from '@angular/core';
import {Claims} from "../../../models/Claims";
import {User} from "../../../models/user";
import {ClaimService} from "../../../_services/claim.service";
import {StatusClaims} from "../../../models/enumerations/StatusClaims";
import {Media} from "../../../models/media";

@Component({
  selector: 'app-claim-mod',
  templateUrl: './claim-mod.component.html',
  styleUrls: ['./claim-mod.component.scss']
})
export class ClaimModComponent {
  pageSize = 5; // Number of items to display per page
  currentPage = 1; //
  public claims:Claims[]=[];
  claim!:Claims;
  user!:User;
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isImageModalOpen: boolean = false; // Track if the image modal is open
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  constructor(private claimsService : ClaimService) {

  }
  ngOnInit(): void {
    this.claimsService.GetModClaims()
      .subscribe(res=>{
        this.claims = res.filter(claim => claim.statusClaims === StatusClaims.In_process);
        console.log(this.claims)
      })

  }
public onPreviousClick(claim : Claims): void {
  if (this.selectedMediaIndex > 0) {
  this.selectedMediaIndex--;
  this.selectedMedia = claim.medias[this.selectedMediaIndex];
}
}

public onNextClick(claim :Claims): void {
  if (this.selectedMediaIndex < claim.medias.length - 1) {
  this.selectedMediaIndex++;
  this.selectedMedia = claim.medias[this.selectedMediaIndex];
}
}

public onImageClick(medias: any[]): void {
  this.selectedMediaIndex = 0;
  this.selectedMedia = medias[0];
  this.isImageModalOpen = true;
}

  // Close the image modal
  public closeImageModal(): void {
    this.isImageModalOpen = false; // Close the image modal
    this.selectedMedia = null; // Clear the selected media object
  }
  showText: boolean = false; // Define a boolean flag to control the visibility of the "Show" text

  ResolveClaim(id :number) {
    const status = StatusClaims.Resolved;

    this.claimsService.claimTreatment(id, status)
      .subscribe(response => {
        this.claimsService.GetModClaims()
          .subscribe(res=>{
            this.claims = res.filter(claim => claim.statusClaims === StatusClaims.In_process);
          })
      });

  }
  RejectClaim(id :number) {
    const status = StatusClaims.Rejected;

    this.claimsService.claimTreatment(id, status)
      .subscribe(response => {
        this.claimsService.GetModClaims()
          .subscribe(res=>{
            this.claims = res.filter(claim => claim.statusClaims === StatusClaims.In_process);
          })
      });

  }


}
