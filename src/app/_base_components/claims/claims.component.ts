import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../_services/user.service';
import { Claims } from '../../models/Claims';
import { ClaimService } from '../../_services/claim.service';
import { DatePipe } from '@angular/common';
import { Event } from '../../models/Event';
import { Media } from '../../models/media';
import { StatusClaims } from '../../models/enumerations/StatusClaims';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss'],
})
export class ClaimsComponent implements OnInit {
  public claims: Claims[] = [];
  pageSize = 3; // Number of items to display per page
  currentPage = 1; // Current page number
  user!: User;
  selectedClaim!: Claims;
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isAddModalOpen = false;
  constructor(private claimsService: ClaimService) {}

  ngOnInit(): void {
    this.getClaims(); // Get claims on component init
  }

  private getClaims(): void {
    this.claimsService.GetClaims().subscribe((res) => {
      this.claims = res.filter((claim) => claim.statusClaims != StatusClaims.In_process);
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  public isImageModalOpen: boolean = false; // Track if the image modal is open
  showText: boolean = false; // Define a boolean flag to control the visibility of the "Show" text

  // Handle image click event

  // Close the image modal
  public closeImageModal(): void {
    this.isImageModalOpen = false; // Close the image modal
    this.selectedMedia = null; // Clear the selected media object
  }

  onDeleteClick(id: number): void {
    this.claimsService.DeleteClaim(id).subscribe((response) => {
      this.getClaims(); // Refresh claims array after delete
    });
  }
  public onPreviousClick(claim: Claims): void {
    if (this.selectedMediaIndex > 0) {
      this.selectedMediaIndex--;
      this.selectedMedia = claim.medias[this.selectedMediaIndex];
    }
  }

  public onNextClick(claim: Claims): void {
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
  onAddClick() {
    this.isAddModalOpen = true;
  }
  closeAddModal() {
    this.isAddModalOpen = false;
  }
}
