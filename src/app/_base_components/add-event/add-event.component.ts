import { Component } from '@angular/core';
import { Event } from '../../models/Event';
import { EventService } from '../../_services/event.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../models/user';
import { Media } from '../../models/media';
import {NgForm} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {EventUserComponent} from "../event-user/event-user.component";
import {EventComponent} from "../event/event.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [DatePipe]
})
export class AddEventComponent {
  files: Media[] = [];
  user!: User;
  event: Event = new Event(); // define an empty Event object
  mediaList: Media[] = []; // define an empty array of Media objects
  selectedFiles: File[] = [];
  onFileSelected(event): void {
    this.selectedFiles = event.target.files;
  }
  constructor(private eventService: EventService, private userService: UserService, private datePipe: DatePipe) {}


  onSubmit(eventForm: NgForm) {
    // Format the start date
    const startDate = new Date(this.event.startDate);
    const formattedStartDate = startDate.toISOString();

    // Format the end date
    const endDate = new Date(this.event.endDate);
    const formattedEndDate = endDate.toISOString();

    const formData = new FormData();
    formData.append('title', this.event.title);
    formData.append('description', this.event.description);
    formData.append('startDate', formattedStartDate);
    formData.append('endDate', formattedEndDate);
    formData.append('adresse', this.event.adresse);

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('files', this.selectedFiles[i]);
    }

    this.eventService.addEvent(formData, this.mediaList).subscribe(
      (response) => {
        console.log('Event added successfully!');
        // Add any additional code to handle success here
        eventForm.reset(); // reset the form after successful submission
        this.event = new Event(); // reset the Event object
        this.mediaList = []; // reset the Media list
        window.location.reload()
        Swal.fire('Success!', 'Event added successfully!', 'success')

      },
      (error) => {
        console.log('Error adding event: ', error);
        // Add any additional code to handle error here
        Swal.fire('Success!', 'event added successfully!', 'success')

      }
    );
  }

}
