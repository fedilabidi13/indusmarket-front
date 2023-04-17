import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "../models/post";
import {PostComment} from "../models/postComment";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  token!:string;
  user!:User;


  constructor(private http: HttpClient ,private userService:UserService , private router:Router) {

  }

  GetPosts(){
    // this.user=this.userService.getCurrentUser()
    // // @ts-ignore
    // this.token = localStorage.getItem("currentUser")
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // // @ts-ignore
    return this.http.get<Post[]>("http://localhost:8085/post/findAll")
      .pipe(map((res:any)=>{
        return res;
      }))
  }
  getCommentsByPostId(postId: number): Observable<any[]> {
    const authToken = localStorage.getItem("currentUser");
    const url = `http://localhost:8085/comment/getAll?idPost=${postId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
    return this.http.get<any[]>(url , {headers});
  }

  addPost(post: Post): Observable<Post> {
    // @ts-ignore
    this.token = localStorage.getItem("currentUser");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    // Make sure to update the URL to the appropriate endpoint for adding posts
    const url = 'http://localhost:8085/post/add';

    // Use the HttpClient POST method to send the post object to the API
    return this.http.post<Post>(url, post, { headers }).pipe(
      map((res: any) => {
        return res; // You can return the response or any other custom data here
      })
    );
  }
  getComments(id: string): Observable<Comment[]> {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Comment[]>('http://localhost:8085/comment/get/' + id, {headers: this.getHeaders});
  }



  addCommentPst(idPost: string, postComment: PostComment) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.post<Comment>('http://localhost:8085/SpringMVC/comment/add/' + idPost + '/1', postComment, {headers: this.getHeaders});
  }
  addCommentReply(idComm: string, postComment: PostComment) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.post<Comment>('http://localhost:8085/comment/add-Com-to-Com/' + idComm + '/1', postComment, {headers: this.getHeaders});
  }

  DeletePost(idPost: number) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `http://localhost:8085/post/delete?idPost=${idPost}`;

    // @ts-ignore
    return this.http.post<Post>(url ,new FormData(),{headers: headers});

  }

  DeleteCom(idCom: string) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.delete<PostComment>('http://localhost:8085/comment/delete/' + idCom , {headers: this.getHeaders});

  }
  UpdateCom(idCom: string , c: PostComment) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.put<PostComment>('http://localhost:8085/comment/update/' + idCom + '/' , c , {headers: this.getHeaders});

  }
  UpdatePost(idCom: string , c: Post) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.put<PostComment>('http://localhost:8085/post/update/' + idCom + '/' , c , {headers: this.getHeaders});

  }



  getpostByiD(id: string): Observable<Post>{
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Post>('http://localhost:8085/post/findById/' + id , {headers: this.getHeaders});
  }








}
