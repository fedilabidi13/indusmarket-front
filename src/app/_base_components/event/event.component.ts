import { Component } from '@angular/core';
import {EventService} from "../../_services/event.service";
import {Event} from "../../models/Event";
import {TicketService} from "../../_services/ticket.service";
import {Ticket} from "../../models/Ticket";
import {User} from "../../models/user";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
public events:Event[]=[];
ticket !:Ticket;
constructor(private eventService:EventService,private ticketService : TicketService) {
}
  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(res=>{
        this.events = res.filter(event => event.accepted === true);
        console.log(this.events)
      })

  }
  OnParticipate(eventId : number){
  this.ticketService.Partipate(eventId).subscribe(
    (response) => {
      alert('you are participated successfully !');
    },
    (error) => {
      alert('error !');      // Add any additional code to handle error here
    }
  );
  }


}
