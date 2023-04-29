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
import {ModsTableComponent} from "./_base_components/back-office/mods-table/mods-table.component";
import {UserShopsComponent} from "./_base_components/user-shops/user-shops.component";
import {UserProductsComponent} from "./_base_components/user-products/user-products.component";
import {Essai2Component} from "./_base_components/forum/essai2/essai2.component";
import {ForumComponent} from './_base_components/forum-chat/forum/forum.component';
import {AddPostComponent} from "./_base_components/forum-chat/add-post/add-post.component";
import {EditPostComponent} from "./_base_components/forum-chat/edit-post/edit-post.component";
import {ChatComponent} from "./_base_components/forum-chat/chat/chat.component";
import {CommentComponent} from "./_base_components/forum-chat/comment/comment.component";
import {ReactComponent} from "./_base_components/forum-chat/react/react.component";
import {AddCommentComponent} from "./_base_components/forum-chat/add-comment/add-comment.component";
import {PostDetailsComponent} from "./_base_components/forum-chat/post-details/post-details.component";
import {PostsTabComponent} from "./_base_components/back-office/posts-tab/posts-tab.component";
import {CommentsTabComponent} from "./_base_components/back-office/comments-tab/comments-tab.component";
import {ReactsTabComponent} from "./_base_components/back-office/reacts-tab/reacts-tab.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mail-verif', component: MailVerifComponent },
  { path: 'back-office', component: LoginBackComponent },
  { path: 'back-office/dashboard', component: DashboardComponent },
  { path: 'back-office/users', component: UsersTableComponent },
  { path: 'back-office/mods', component: ModsTableComponent },
  { path: 'user-shop', component: UserShopsComponent },
  { path: 'user-product', component: UserProductsComponent },
  { path: 'essai2', component: Essai2Component },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/add-post', component: AddPostComponent },
  { path: 'forum/edit-post', component: EditPostComponent },
  { path: 'forum/chat', component: ChatComponent },
  { path: 'forum/comment', component: CommentComponent },
  { path: 'forum/react', component: ReactComponent },
  { path: 'forum/add-comment', component: AddCommentComponent },
  { path: 'forum/post-details/:id', component: PostDetailsComponent },
  { path: 'back-office/posts-tab', component: PostsTabComponent },
  { path: 'back-office/comments-tab', component: CommentsTabComponent },
  { path: 'back-office/reacts-tab', component: ReactsTabComponent },










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
