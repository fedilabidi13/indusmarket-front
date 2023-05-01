import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackOfficeRoutingModule } from './back-office-routing.module';
import { LoginBackComponent } from './login-back/login-back.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {FormsModule} from "@angular/forms";
import { UsersTableComponent } from './users-table/users-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ModsTableComponent } from './mods-table/mods-table.component';
import { ModsConfirmComponent } from './mods-confirm/mods-confirm.component';
import { ModsDashboardComponent } from './mods-dashboard/mods-dashboard.component';
import { ModsSidebarComponent } from './mods-sidebar/mods-sidebar.component';
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [
    LoginBackComponent,
    SidebarComponent,
    UsersTableComponent,
    DashboardComponent,
    ModsTableComponent,
    ModsConfirmComponent,
    ModsDashboardComponent,
    ModsSidebarComponent,



  ],
    imports: [
        CommonModule,
        BackOfficeRoutingModule,
        FormsModule,
        NgxPaginationModule,
      AppModule

    ]
})
export class BackOfficeModule { }
