import { Component } from '@angular/core';
import {Event} from "../../../models/Event";
import {EventService} from "../../../_services/event.service";
import {User} from "../../../models/user";
import {Media} from "../../../models/media";
import {StatusClaims} from "../../../models/enumerations/StatusClaims";

@Component({
  selector: 'app-evant-mod',
  templateUrl: './evant-mod.component.html',
  styleUrls: ['./evant-mod.component.scss']
})
export class EvantModComponent {

  public events: Event[] = [];
  event!:Event;
  pageSize = 5;
  currentPage = 1;
  user!: User;
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isImageModalOpen = false;
  showText = false;
  constructor(private eventService:EventService) {
  }
  onPageChange(event: any): void {
    this.currentPage = event; // Update current page when page changes
  }
  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(res=>{
        this.events = res.filter(event => event.accepted === false);
        console.log(this.events)
      })

  }

  // Handle image click event
  public onPreviousClick(event : Event): void {
    if (this.selectedMediaIndex > 0) {
      this.selectedMediaIndex--;
      this.selectedMedia = event.medias[this.selectedMediaIndex];
    }
  }

  public onNextClick(event :Event): void {
    if (this.selectedMediaIndex < event.medias.length - 1) {
      this.selectedMediaIndex++;
      this.selectedMedia = event.medias[this.selectedMediaIndex];
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
  AcceptEvent(id : number){
    this.eventService.acceptEvent(id)
      .subscribe(response => {
        this.eventService.getEvents()
          .subscribe(res=>{
            this.events = res.filter(event => event.accepted === false);
          })
      });

  }
  onDeleteClick(id: number): void {
    this.eventService.deleteEvent(id).subscribe( response=>{
      this.eventService.getEvents()
        .subscribe(res=>{
          this.events = res.filter(event => event.accepted === false);
        })
    });

  }
}
