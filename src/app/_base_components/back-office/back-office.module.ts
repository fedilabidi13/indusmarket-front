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
import { ModsConfirmComponent } from './mods-confirm/mods-confirm.component';
import { ModsDashboardComponent } from './mods-dashboard/mods-dashboard.component';
import { ModsSidebarComponent } from './mods-sidebar/mods-sidebar.component';
import {AppModule} from "../../app.module";
import { ClaimModComponent } from './claim-mod/claim-mod.component';
import { EvantModComponent } from './evant-mod/evant-mod.component';
import { PostsTabComponent } from './posts-tab/posts-tab.component';
import { CommentsTabComponent } from './comments-tab/comments-tab.component';
import { ReactsTabComponent } from './reacts-tab/reacts-tab.component';


@NgModule({
  declarations: [
    LoginBackComponent,
    SidebarComponent,
    UsersTableComponent,
    DashboardComponent,
    ModsTableComponent,
    PostsTabComponent,
    CommentsTabComponent,
    ReactsTabComponent,
    ModsTableComponent,
    ModsConfirmComponent,
    ModsDashboardComponent,
    ModsSidebarComponent,



    ModsSidebarComponent,
    ClaimModComponent,
    EvantModComponent
  ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        FormsModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        AppModule


    ]

})
export class BackOfficeModule { }
