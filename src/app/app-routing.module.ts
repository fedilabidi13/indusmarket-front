import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_base_components/login/login.component';
import { RegisterComponent } from './_base_components/register/register.component';
import {HomeComponent} from "./_base_components/home/home.component";
import {ProfileComponent} from "./_base_components/profile/profile.component";
import {MailVerifComponent} from "./_base_components/mail-verif/mail-verif.component";
import {ShoppingCartComponent} from "./_base_components/shopping-cart/shopping-cart.component";
import {ShoppingCart} from "./models/shoppingCart";
import {ShoppingCartNoUserComponent} from "./_base_components/shopping-cart-no-user/shopping-cart-no-user.component";
import {ShopComponent} from "./_base_components/shop-module/shop/shop.component";
import {OrderComponent} from "./_base_components/order/order.component";
import {BackOfficeModule} from "./_base_components/back-office/back-office.module";
import {LoginBackComponent} from "./_base_components/back-office/login-back/login-back.component";
import {SidebarComponent} from "./_base_components/back-office/sidebar/sidebar.component";
import {DashboardComponent} from "./_base_components/back-office/dashboard/dashboard.component";
import {UsersTableComponent} from "./_base_components/back-office/users-table/users-table.component";
import {ModsTableComponent} from "./_base_components/back-office/mods-table/mods-table.component";
import {UserShopsComponent} from "./_base_components/user-shops/user-shops.component";
import {UserProductsComponent} from "./_base_components/user-products/user-products.component";
import {ModsConfirmComponent} from "./_base_components/back-office/mods-confirm/mods-confirm.component";
import {ModsDashboardComponent} from "./_base_components/back-office/mods-dashboard/mods-dashboard.component";
import {AddEventComponent} from "./_base_components/add-event/add-event.component";
import {ClaimModComponent} from "./_base_components/back-office/claim-mod/claim-mod.component";
import {EvantModComponent} from "./_base_components/back-office/evant-mod/evant-mod.component";
import {IpVerifComponent} from "./_base_components/ip-verif/ip-verif.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mail-verif', component: MailVerifComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'shoppingCartNoUser', component: ShoppingCartNoUserComponent },
  { path: 'shop', component: ShopComponent},
  { path: 'Orders', component: OrderComponent },
  { path: 'back-office', component: LoginBackComponent },
  { path: 'back-office/dashboard', component: DashboardComponent },
  { path: 'back-office/users', component: UsersTableComponent },
  { path: 'back-office/mods', component: ModsTableComponent },
  { path: 'user-shop', component: UserShopsComponent },
  { path: 'user-product', component: UserProductsComponent },
  { path: 'verif-location', component: IpVerifComponent },
  {path:'addEvent',component:AddEventComponent},
  { path: 'back-office/mod-confirm', component: ModsConfirmComponent },
  { path: 'back-office/mod/dashboard', component: ModsDashboardComponent },
  {path:'mod/claim-mod',component:ClaimModComponent},
  {path:'mod/event-mod',component:EvantModComponent},

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
