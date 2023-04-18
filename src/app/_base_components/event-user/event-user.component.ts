import { Component } from '@angular/core';
import {Event} from "../../models/Event";
import {EventService} from "../../_services/event.service";
import {User} from "../../models/user";
import {ClaimService} from "../../_services/claim.service";

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss']
})
export class EventUserComponent {

  public events:Event[]=[];

  constructor(private eventService:EventService) {
  }
  ngOnInit(): void {
    this.eventService.getUserEvents()
      .subscribe(res=>{
        this.events = res;
        console.log(this.events)
      })

  }
  pageSize = 3; // Number of items to display per page
  currentPage = 1; // Current page number
  user!:User;
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
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
}
