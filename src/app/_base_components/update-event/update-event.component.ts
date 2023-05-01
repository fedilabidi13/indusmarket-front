import {Component, Input, OnInit } from '@angular/core';
import {Media} from "../../models/media";
import {User} from "../../models/user";
import {Event} from "../../models/Event";
import {EventService} from "../../_services/event.service";
import {UserService} from "../../_services/user.service";
import {DatePipe} from "@angular/common";
import {NgForm} from "@angular/forms";
import {EventUserComponent} from "../event-user/event-user.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent {
  @Input()id:number;
  formData: Event = new Event();
  files: Media[] = [];
  user!: User;
  event: Event = new Event(); // define an empty Event object
  mediaList: Media[] = []; // define an empty array of Media objects
  selectedFiles: File[] = [];
  onFileSelected(event): void {
    this.selectedFiles = event.target.files;
  }

  constructor(private eventService: EventService,private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getEventById(this.id).subscribe(data => {
      this.formData = data;
      console.log(this.id);
      console.log(this.formData);
    }, error => console.log(error));
  }

  onFileChange(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const media = new Media();
      media.name = file.name;
      this.mediaList.push(media);
    }
  }
  onSubmit(eventForm: NgForm) {
    // Format the start date
    const startDate = new Date(this.event.startDate);
    const formattedStartDate = startDate.toISOString();

    // Format the end date
    const endDate = new Date(this.event.endDate);
    const formattedEndDate = endDate.toISOString();

    const formData = new FormData();
    formData.append('id', this.id.toString());
    formData.append('title', this.event.title);
    formData.append('description', this.event.description);
    formData.append('startDate', formattedStartDate);
    formData.append('endDate', formattedEndDate);
    formData.append('adresse', this.event.adresse);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }

    this.eventService.updateEvent2(formData, this.mediaList).subscribe(
      (response) => {
        console.log('Event updated successfully!');
        // Add any additional code to handle success here
        eventForm.reset(); // reset the form after successful submission
        this.event = new Event(); // reset the Event object
        this.mediaList = []; // reset the Media list
      },
      (error) => {
        console.log('Error updating event: ', error);
        // Add any additional code to handle error here
      }
    );
  }
  // onSubmit() {
  //   this.eventService.updateEvent(this.formData,this.mediaList).subscribe( data =>{
  //     }
  //     , error => console.log(error));
  //   console.log(this.id);
  //   console.log(this.formData);
  // }
  openEditEventModal() {
    this.eventService.getEventById(this.id).subscribe(event => {
      // Set the event object for the form
      this.event = event;

      // Set the event ID in the hidden input field
      const eventIdInput = document.getElementById('eventId') as HTMLInputElement;
      eventIdInput.value = this.id.toString();
    });
  }
  goToOfferList(){
    this.router.navigate(['/profile']);
  }

}
