import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit{
  constructor(private http : HttpClient, private router: Router) {
  }
  message !: string ;
  email = '';
  created = true;
  not_created = true;


  ngOnInit(): void {
  }
  requestPwd()
  {
    this.http.post("http://localhost:8085/auth/resetPassword?email="+this.email,{}).subscribe(
      (next)=>{
        console.log(next)
        this.router.navigate(['/new-password'])

      }, error => {
        console.error(error)
        this.router.navigate(['/new-password'])

      }
    )

  }

}
