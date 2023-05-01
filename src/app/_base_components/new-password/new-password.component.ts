import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  email!: string;
  pwd !: string;
  phone !: string ;
  message !: string ;
  created = true;
  constructor(private router: Router, private http : HttpClient) {
  }

  ngOnInit(): void {
  }
  newPwd()
  {
    this.http.post("http://localhost:8085/auth/confirmPassword?email="+this.email+"&phone="+this.phone+"&pass="+this.pwd,{})
      .subscribe((res)=>
      {
        console.log(res
        )
      }, error => {
        this.message = error.error.text

        this.created = false;
      })
  }

}
