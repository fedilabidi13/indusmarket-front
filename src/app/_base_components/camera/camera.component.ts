import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent {

  img=true;
  @ViewChild('video') video: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('photo') photo: ElementRef;
  constructor(private http: HttpClient) {
  }
  ngAfterViewInit() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      })
      .catch(err => console.error(err));
  }
  capture() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement,0,0, 300, 150);
    this.photo.nativeElement.src = this.canvas.nativeElement.toDataURL('image/png');
    this.img=false;
    const authToken = localStorage.getItem('currentUser');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    //
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const canvasDataUrl = canvas.toDataURL(); // Get the canvas image data URL
    const blob = this.dataURItoBlob(canvasDataUrl); // Convert the data URL to a Blob
    const file = new File([blob], 'canvas.png', { type: 'image/png' }); // Create a File object
    //
    const formData = new FormData();
    formData.append('file', file);

    this.http.post("http://localhost:8085/profile/picture/update",formData, {headers: headers}).subscribe(response => {
      console.log(response);
    });
  }
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

}
