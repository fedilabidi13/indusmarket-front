import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.scss']
})
export class TwoFaComponent implements OnInit {
  constructor(private http : HttpClient, private router: Router) {
  }
  phoneToken !: string;
  emailToken !: string;
  message = true;
  msg !: string;
  validate()
  {
    this.message=false
    this.http.post("http://localhost:8085/auth/authenticate2fa?mail="+this.emailToken+"&phone="+this.phoneToken,{}).subscribe(
      (res)=>
      {
        console.log(res)
        this.msg
      }, error => {
        this.msg = error.error.text;
        console.error(error)
        if(error.error.text.startsWith('ey'))
        {
          localStorage.setItem("currentUser", error.error.text)
          this.router.navigate(['/profile'])
        }
      }
    )
  }

  ngOnInit(): void {
  }

}
