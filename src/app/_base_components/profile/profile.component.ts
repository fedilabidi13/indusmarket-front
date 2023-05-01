import {Component, OnInit} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Shop} from "../../models/shop";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit{
  shop : Shop = new Shop();
  user!: User;
  constructor(private http:HttpClient,private userService: UserService, private router: Router) {
  }
  loading = true;
  public  redirect(root:any){
    this.router.navigate([root]);
  }

  private fileToUpload: File | null = null;
  //TODO add condition for empty file on upload
  private shopFiles: File[]  = [];
  files : FileList;

  message!:string;
  created = true;
  not_created = true;
  authToken !: string;
  phoneNumber : string =''
  adresse : string =''
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
    console.log(event.target.files)
    this.fileToUpload = event.target.files.items
  }
  getLatLng(event){
    console.log('we are in parent component');
    console.log(event);
  //  this.latLng = event;
  }
  uploadFiles():void
  {
    console.log("begining upload!")
    if (!this.shopFiles) {
      return;
    }

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', this.shopFiles);
    formData.append('name', this.shop.name)
    formData.append('mail', this.shop.mail)
    formData.append('phoneNumber', this.phoneNumber)
    formData.append('adresse', this.shop.adresse)

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);

    console.log(this.authToken)
    console.log(this.shopFiles)
    for (let file of this.shopFiles)
    {
      if (!this.isImageFile(file))
      {
        this.message = "unsupported file type!"
        this.created = false;
      }
    }



      this.http.post("http://localhost:8085/shop/add",formData, {headers}).subscribe(() => {

        this.message = "shop picture added successfully! "
        this.created=false;

        window.location.reload();
      }, error => {
        this.created=false;
        this.message = "shop picture added successfully! "
      });
    }
  enable2fa()
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
    this.http.post("http://localhost:8085/auth/enable2fa", {}, {headers: headers}).subscribe(
      (res) =>
      {
        console.log(res)
        window.location.reload()

      }, error=>{
        console.error(error)
        window.location.reload()
      }
    )


  }



  onFilesSelected(event: any): void {
    console.log("files",event.target.files)
    this.files = event.target.files//.items//(0);
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
  addShop() {
    // Créer un objet FormData pour envoyer des données sous forme de formulaire
    const formData = new FormData();

    // Ajouter les données du formulaire dans l'objet FormData
    formData.append('name', this.shop.name);
    formData.append('mail', this.shop.mail);
    formData.append('adresse', this.shop.adresse);
    console.log(this.shop.adresse)
    // @ts-ignore
    formData.append('phoneNumber', this.shop.phoneNumber);

    // Ajouter des fichiers s'il y en a
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append('file', this.files[i]);
      }
    }

    // Récupérer le token d'authentification depuis le localStorage
    const token = localStorage.getItem("currentUser")

    // Ajouter l'en-tête d'autorisation contenant le token JWT
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Envoyer la requête POST pour ajouter le magasin avec les données du formulaire
    return this.http.post('http://localhost:8085/shop/add', formData, { headers: headers }).subscribe(
      // En cas de succès, afficher la réponse dans la console
      (response) => {
        console.log(response)
      },
      // En cas d'erreur, afficher l'erreur dans la console
      (error) => {
        console.error(error)
      }
    )
  }

}
