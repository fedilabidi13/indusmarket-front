import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_base_components/login/login.component';
import { RegisterComponent } from './_base_components/register/register.component';
import {HomeComponent} from "./_base_components/home/home.component";
import {ProfileComponent} from "./_base_components/profile/profile.component";
import {MailVerifComponent} from "./_base_components/mail-verif/mail-verif.component";
import {BackOfficeModule} from "./_base_components/back-office/back-office.module";
import {LoginBackComponent} from "./_base_components/back-office/login-back/login-back.component";
import {SidebarComponent} from "./_base_components/back-office/sidebar/sidebar.component";
import {DashboardComponent} from "./_base_components/back-office/dashboard/dashboard.component";
import {UsersTableComponent} from "./_base_components/back-office/users-table/users-table.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mail-verif', component: MailVerifComponent },
  { path: 'back-office', component: LoginBackComponent },
  { path: 'back-office/dashboard', component: DashboardComponent },
  { path: 'back-office/users', component: UsersTableComponent },


];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
