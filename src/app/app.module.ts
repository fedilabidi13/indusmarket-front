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
import { CartComponent } from './_base_components/cart/cart.component';
import { HomeComponent } from './_base_components/home/home.component';
import { NavComponent } from './_base_components/nav/nav.component';
import { ProfileComponent } from './_base_components/profile/profile.component';
import { ProfileBadgeComponent } from './_base_components/profile-badge/profile-badge.component';
import { BreadCrumpComponent } from './_base_components/bread-crump/bread-crump.component';
import { Nav2Component } from './_base_components/nav2/nav2.component'
import { MailVerifComponent } from './_base_components/mail-verif/mail-verif.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {GoogleMapsModule} from "@angular/google-maps";
import {ClaimsComponent} from "./_base_components/claims/claims.component";
//import { ClaimsComponent } from './claims/claims.component';

import {ShopComponent} from "./_base_components/shop-module/shop/shop.component";
import {ShopModuleComponent} from "./_base_components/shop-module/shop-module.component";
import {ProductComponent} from "./_base_components/shop-module/product/product.component";
import {ShopModuleModule} from "./_base_components/shop-module/shop-module.module";
import {NgxPaginationModule} from "ngx-pagination";
import { CartItemComponent } from './_base_components/cart-item/cart-item.component';
import { OrderComponent } from './_base_components/order/order.component';
import { InvoiceComponent } from './_base_components/invoice/invoice.component';
import { ShoppingCartComponent } from './_base_components/shopping-cart/shopping-cart.component';
import { ShoppingCartNoUserComponent } from './_base_components/shopping-cart-no-user/shopping-cart-no-user.component';
import { PostsComponent } from './_base_components/posts/posts.component';
import { UserShopsComponent } from './_base_components/user-shops/user-shops.component';
import { UserProductsComponent } from './_base_components/user-products/user-products.component';
import { EventComponent } from './_base_components/event/event.component';
import { AddClaimComponent } from './_base_components/add-claim/add-claim.component';
import { EventUserComponent } from './_base_components/event-user/event-user.component';

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
    CartComponent,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    ProfileBadgeComponent,
    BreadCrumpComponent,
    Nav2Component,
    MailVerifComponent,
    ClaimsComponent,
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    HomeComponent,
    NavComponent,
    ProfileComponent,
    ProfileBadgeComponent,
    BreadCrumpComponent,
    Nav2Component,
    ShopComponent,
    ShopModuleComponent,
    PostsComponent,
    UserShopsComponent,
    UserProductsComponent,
    EventComponent,
    AddClaimComponent,
    EventUserComponent,
    CartItemComponent,
    OrderComponent,
    InvoiceComponent,
    ShoppingCartComponent,
    ShoppingCartNoUserComponent


  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ShopModuleModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
