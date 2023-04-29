import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "../models/post";
import {PostComment} from "../models/postComment";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {User} from "../models/user";
import {React} from "../models/react";

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
    this.token = localStorage.getItem("currentUser")
     const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // // @ts-ignore
    return this.http.get<Post[]>("http://localhost:8085/post/findAll",{ headers: headers} )
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
  addPost(post: Post, files?: FileList): Observable<Post> {
    const formData = new FormData();
    formData.append('postTitle', post.postTitle);
    formData.append('body', post.body);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    const token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Post>("http://localhost:8085/post/add", formData, {
      headers: headers
    });
  }

  addComment(comment: PostComment, idPost: string, files?: FileList): Observable<Post> {
    const formData = new FormData();
    formData.append('commentBody', comment.commentBody);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    const token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Post>(`http://localhost:8085/comment/add?idPost=${idPost}`, formData, {
      headers: headers
    });
  }
  updatePost(post: Post, files: FileList, id: number): Observable<Post> {
    const formData = new FormData();
    formData.append('postTitle', post.postTitle);
    formData.append('body', post.body);
    formData.append('user', post.user.id.toString());
    formData.append('id', id.toString());
    for (let i = 0; i < files.length; i++) {
      formData.append('medias', files[i], files[i].name);
    }
    const token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<Post>("http://localhost:8085/post/update", formData, { headers });
  }

  getComments(idPost: number) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>('http://localhost:8085/comment/getAll?idPost='+idPost, {headers: headers});
  }

  addCommentReply(id: number, comment: PostComment, files: FileList) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    const formData = new FormData();
    formData.append('commentBody', comment.commentBody);
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    return this.http.post<Comment>('http://localhost:8085/comment/addResponse?idComment='+id, formData, {headers: headers});
  }
  getCommentReplies(id: number)
  {
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any[]>("http://localhost:8085/comment/getReply?idComment="+id, { headers : headers})
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
  DeleteComment(idComment: number) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `http://localhost:8085/comment/delete?idComment=${idComment}`;

    // @ts-ignore
    return this.http.post<PostComment>(url ,new FormData(),{headers: headers});

  }



  getpostByiD(id: string): Observable<Post>{
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<any>('http://localhost:8085/post/findById?idPost=' + id , {headers: this.getHeaders});
  }

  addReactToPost(idPost: number, reactType: string): Observable<React> {
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `http://localhost:8085/react/post/add?idPost=${idPost}&reactType=${reactType}`;
    return this.http.post<React>(url, {}, { headers: headers});
  }
  addReactToComment(idComment: number, reactType: string): Observable<React> {
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    const url = `http://localhost:8085/react/comment/add?idComment=${idComment}&reactType=${reactType}`;
    return this.http.post<React>(url, {}, { headers: headers});
  }


}
