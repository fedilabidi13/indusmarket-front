import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-mods-confirm',
  templateUrl: './mods-confirm.component.html',
  styleUrls: ['./mods-confirm.component.scss']
})
export class ModsConfirmComponent {
  message : string = 'still on test';
  created : boolean = true;
  password !: string;
  confirmPassword !: string;

  token !: string;
   constructor(private httpClient: HttpClient, private router: Router) {
  }
  confirmToken()
  {
    const formData = new FormData();
    let params: URLSearchParams = new URLSearchParams();
    params.set('code', this.token);
    params.set('pwd', this.password);

    // @ts-ignore
    this.httpClient.post("http://localhost:8085/auth/newPassword?code="
      +this.token+"&pwd="+this.password)
      .subscribe(res  =>
      {
          console.log(res)
      },
        error => {
        console.log('here we go')
        console.log(error)
        this.message=error.error.text
          this.created=false
          console.log(this.message)
          // @ts-ignore
          if (this.message.startsWith('ey')) {
            console.log(error)
            localStorage.setItem('currentUser', error);
            this.router.navigate(['/back-office/mod/dashboard'])
          }
        })
  }
}
