import { Component } from '@angular/core';
import {EventService} from "../../_services/event.service";
import {Event} from "../../models/Event";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
public events:Event[]=[];

constructor(private eventService:EventService) {
}
  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe(res=>{
        this.events = res;
        console.log(this.events)
      })

  }

}
