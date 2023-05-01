import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { HeaderComponent } from './_base_components/header/header.component';
import { CarouselComponent } from './_base_components/carousel/carousel.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './_base_components/login/login.component';
import { RegisterComponent } from './_base_components/register/register.component';
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
import { UserShopsComponent } from './_base_components/user-shops/user-shops.component';
import { UserProductsComponent } from './_base_components/user-products/user-products.component';
import { ForumComponent } from './_base_components/forum-chat/forum/forum.component';
import { AddPostComponent } from './_base_components/forum-chat/add-post/add-post.component';
import { EditPostComponent } from './_base_components/forum-chat/edit-post/edit-post.component';
import {MatDialogModule} from "@angular/material/dialog";
import {CommentComponent} from "./_base_components/forum-chat/comment/comment.component";
import {ReactComponent} from "./_base_components/forum-chat/react/react.component";
import {AddCommentComponent} from "./_base_components/forum-chat/add-comment/add-comment.component";
import { PostDetailsComponent } from './_base_components/forum-chat/post-details/post-details.component';
import {BackOfficeModule} from "./_base_components/back-office/back-office.module";
import {NgOptimizedImage} from "@angular/common";
import {ChatBoxComponent} from "./_base_components/WS/chat-box/chat-box.component";
import {ChatComponent} from "./_base_components/WS/chat/chat.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatPriveComponent} from "./_base_components/WS/chat-prive/chat-prive.component";

export function tokenGetter() {
  return localStorage.getItem("currentUser");
}
@NgModule({
  bootstrap: [AppComponent],

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
    UserShopsComponent,
    UserProductsComponent,
    ForumComponent,
    AddPostComponent,
    EditPostComponent,
    ChatComponent,
    CommentComponent,
    ReactComponent,
    AddCommentComponent,
    PostDetailsComponent,
    ChatBoxComponent,
    ChatPriveComponent
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
        ReactiveFormsModule,
        BackOfficeModule,
        NgOptimizedImage,
    ],
  providers: []
})
export class AppModule { }
