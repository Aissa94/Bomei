import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import {CommonService} from '../../common.service';

@Component({
  standalone: true,
  imports: [GoogleMapsModule],
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {

  constructor(private userService : CommonService) { }

  ngOnInit(): void {
  }

  @ViewChild('myGoogleMap', { static: false })
  map!: GoogleMapsModule;
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;

  name: String;
  email: String;
  message: string;
  zoom = 15;
  maxZoom = 18;
  minZoom = 8;

  center: google.maps.LatLngLiteral = {
      lat: 25.0673843,
      lng: 55.1445128
  };

  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom:this.maxZoom,
    minZoom:this.minZoom,
  }
  markers = [];
  infoContent = ''

  eventHandler(event: any ,name:string){
    console.log(event,name);
    
    // Add marker on double click event
    if(name === 'mapDblclick'){
      this.dropMarker(event)
    }
  }


  dropMarker(event:any) {
    this.markers.push({
      position: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      label: {
        color: 'blue',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
    })
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.open(marker)
  }

  contactUs() {
    const name = document.querySelector('#name') as HTMLInputElement
    const email = document.querySelector('#email') as HTMLInputElement
    const message = document.querySelector('#message') as HTMLInputElement
    this.name = name.value;
    this.email = email.value;
    this.message = message.value;
    this.userService.contactUs({name: this.name, email: this.email, message: message.value}).subscribe(data => {
      window.location.reload();
    })
  }

}