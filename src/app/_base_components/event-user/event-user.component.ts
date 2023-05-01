import { Component } from '@angular/core';
import {Event} from "../../models/Event";
import {EventService} from "../../_services/event.service";
import {User} from "../../models/user";
import {ClaimService} from "../../_services/claim.service";
import {Media} from "../../models/media";

@Component({
  selector: 'app-event-user',
  templateUrl: './event-user.component.html',
  styleUrls: ['./event-user.component.scss']
})
export class EventUserComponent {
  public events: Event[] = [];
  pageSize = 3;
  currentPage = 1;
  user!: User;
  public selectedMedia: Media; // declare the selectedMedia property with type Media
  public selectedMediaIndex = 0;
  public isImageModalOpen = false;
  showText = false;
  public isAddModalOpen=false;
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getUserEvents().subscribe((res) => {
      this.events = res;
      console.log(this.events);
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event;
  }

  public closeImageModal(): void {
    this.isImageModalOpen = false;
    this.selectedMedia = null;
  }

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
  onAddClick(){
    this.isAddModalOpen=true;
  }
  onDeleteClick(id: number): void {
    this.eventService.UserdeleteEvent(id).subscribe( response=>{
      this.eventService.getUserEvents().subscribe((res) => {
        this.events = res;
      })
    });

  }
}






