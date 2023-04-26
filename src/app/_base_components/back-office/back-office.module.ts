import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { LoginBackComponent } from './login-back/login-back.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UsersTableComponent } from './users-table/users-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ModsTableComponent } from './mods-table/mods-table.component';
import { PostsTabComponent } from './posts-tab/posts-tab.component';


@NgModule({
  declarations: [
    LoginBackComponent,
    SidebarComponent,
    UsersTableComponent,
    DashboardComponent,
    ModsTableComponent,
    PostsTabComponent
  ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        FormsModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ]
})
export class BackOfficeModule { }
