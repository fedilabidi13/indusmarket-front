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
import {ForumComponent} from './_base_components/forum-chat/forum/forum.component';
import {AddPostComponent} from "./_base_components/forum-chat/add-post/add-post.component";
import {EditPostComponent} from "./_base_components/forum-chat/edit-post/edit-post.component";
import {ChatComponent} from "./_base_components/forum-chat/chat/chat.component";
import {CommentComponent} from "./_base_components/forum-chat/comment/comment.component";
import {ReactComponent} from "./_base_components/forum-chat/react/react.component";
import {AddCommentComponent} from "./_base_components/forum-chat/add-comment/add-comment.component";
import {PostDetailsComponent} from "./_base_components/forum-chat/post-details/post-details.component";
import {PostsTabComponent} from "./_base_components/back-office/posts-tab/posts-tab.component";
import {ChatBoxComponent} from "./_base_components/WS/chat-box/chat-box.component";
import {ChatPriveComponent} from "./_base_components/WS/chat-prive/chat-prive.component";
import {ShopDetailsComponent} from "./_base_components/shop-details/shop-details.component";
import {MsgComponent} from "./_base_components/forum-chat/msg/msg.component";
import {TwoFaComponent} from "./_base_components/two-fa/two-fa.component";
import {ResetpwdComponent} from "./_base_components/resetpwd/resetpwd.component";
import {IpVerifComponent} from "./_base_components/ip-verif/ip-verif.component";
import {NewPasswordComponent} from "./_base_components/new-password/new-password.component";


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
  { path: 'shop-details/:id', component: ShopDetailsComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/add-post', component: AddPostComponent },
  { path: 'forum/edit-post', component: EditPostComponent },
  { path: 'forum/chat', component: ChatComponent },
  { path: 'forum/comment', component: CommentComponent },
  { path: 'forum/react', component: ReactComponent },
  { path: 'forum/add-comment', component: AddCommentComponent },
  { path: 'forum/post-details/:id', component: PostDetailsComponent },
  { path: 'back-office/posts-tab', component: PostsTabComponent },
  {path: 'chat', component: ChatBoxComponent},
  {path: 'chatP', component: ChatPriveComponent},
  { path: 'verif-location', component: IpVerifComponent },
  {path:'addEvent',component:AddEventComponent},

  { path: 'back-office/mod-confirm', component: ModsConfirmComponent },
  { path: 'back-office/mod/dashboard', component: ModsDashboardComponent },
  {path:'mod/claim-mod',component:ClaimModComponent},
  {path:'mod/event-mod',component:EvantModComponent},
  {path:'msg',component:MsgComponent},
  { path: 'Orders', component: OrderComponent },

  { path: 'user-shop', component: UserShopsComponent },
  { path: 'user-product', component: UserProductsComponent },
  { path: 'twoFactorsAuth', component: TwoFaComponent },
  { path: 'passwordReset', component: ResetpwdComponent },
  { path: 'verif-location', component: IpVerifComponent },
  { path: 'new-password', component: NewPasswordComponent },



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
