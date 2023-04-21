import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit{
  user!: User;
  loading = true;

  private fileToUpload: File | null = null;
  //TODO add condition for empty file on upload
  message!:string;
  created = true;
  not_created = true;
  authToken !: string;
  constructor(private userService:UserService, private http:HttpClient, private router: Router){}
  ngOnInit(): void {
    if(localStorage.getItem('currentUser')===null)
    {
      this.router.navigate(['/login'])
    }
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.authToken = localStorage.getItem("currentUser")
    console.log(this.user)
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files.item(0);
  }

  onUpload(): void {
    this.loading = false;
    console.log("begining upload!")
    if (!this.fileToUpload) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    console.log(this.authToken)
    if (!this.isImageFile(this.fileToUpload))
    {
      this.message = "unsupported file type!"
      this.created = false;
    }
    if (this.isImageFile(this.fileToUpload))
    {
      this.http.post("http://localhost:8085/profile/picture/update",formData, {headers}).subscribe(() => {

        this.loading = true;
        this.message = "profile picture added successfully! "
        this.created=false;

        window.location.reload();
      }, error => {
        this.loading = true;
        this.created=false;
        this.message = "profile picture added successfully! "
      });
    }


  }
  isImageFile(file: File): boolean {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileName = file.name.toLowerCase();
    return allowedExtensions.some(ext => fileName.endsWith(ext));
  }
}
