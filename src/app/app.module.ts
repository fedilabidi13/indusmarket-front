import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { HeaderComponent } from './_base_components/header/header.component';
import { CarouselComponent } from './_base_components/carousel/carousel.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './_base_components/login/login.component';
import { RegisterComponent } from './_base_components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './_base_components/cart/cart.component'

export function tokenGetter() {
  return localStorage.getItem("currentUser");
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
