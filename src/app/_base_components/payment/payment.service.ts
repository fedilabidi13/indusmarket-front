import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private token: string = localStorage.getItem("currentUser");

  private cabecera = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
  };

  stripeURL = 'http://localhost:8080/stripe/';

  constructor(private httpClient: HttpClient) {}

  public confirmar(id: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `confirm/${id}`, {}, this.cabecera);
  }

  public cancelar(id: string): Observable<string> {
    return this.httpClient.post<string>(this.stripeURL + `cancel/${id}`, {}, this.cabecera);
  }



}

