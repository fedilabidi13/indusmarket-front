import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initMap();
  }
   map;
  @Input() using = 'create';
  @Input() event: any;
  @Input() events: any;
  century21icon;
  @Output() longLat = new EventEmitter<any>();

  private initMap(): void {
    this.century21icon = L.icon({
      iconUrl: 'https://i.ibb.co/sJrMTdz/favicon-32x32.png',
      iconSize: [20, 20]
    });

    if (this.using === 'create') {
      console.log('created');
      this.map = L.map('map', {
        center: [36.8950951, 10.188536],
        zoom: 9
      });
    } else if (this.using === 'displayOne') {
      this.map = L.map('map', {
        center: [this.event.latitude, this.event.lang],
        zoom: 9
      });
    } else {
      this.map = L.map('map', {
        center: [36.8950951, 10.188536],
        zoom: 6
      });
    }

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">Map</a>'
    });

    tiles.addTo(this.map);

    if (this.using === 'create') {
      this.map.on('click', eventLocation => {
        this.revertToParent(eventLocation);
        console.log(eventLocation);
      });
    } else if (this.using === 'displayOne') {
      console.log(this.event);
      // @ts-ignore
      const newMarker = new L.marker([this.event.latitude, this.event.lang], {icon: this.century21icon}).addTo(this.map);
    } else {
      setTimeout(() => {
        console.log(this.events);
        this.events.forEach((eventStruct: any) => {
          console.log(eventStruct);
          // @ts-ignore
          const newMarker = new L.marker([eventStruct.latitude, eventStruct.lang], {icon: this.century21icon}).addTo(this.map);
        });
      }, 3000);
    }
  }

  revertToParent(eventLocation: any) {
    console.log('In child component');
    this.longLat.emit(eventLocation);
  }

  constructor() {}


}
