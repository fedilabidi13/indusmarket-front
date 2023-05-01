import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ip-verif',
  templateUrl: './ip-verif.component.html',
  styleUrls: ['./ip-verif.component.scss']
})
export class IpVerifComponent {
  phoneToken!: string;
  emailToken !: string;
  message !: string ;

  constructor(private router: Router, private http: HttpClient) {
  }
  validate(){
    console.log(this.phoneToken)
    console.log(this.emailToken)
    return this.http.post("http://localhost:8085/auth/confirmAddress?mail="+this.emailToken+"&phone="+this.phoneToken,

      {}).subscribe(next => {
      // @ts-ignore
      this.message = next;
    }, error => {
      if (error.error.text==="location approved u can login now! ")
      {
        this.router.navigate(['login']);
      }
    })

  }

}
