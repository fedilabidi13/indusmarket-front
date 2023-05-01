import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Post} from "../models/post";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  post!: Observable<User>;
  post2: Post = new Post();
  PATH_OF_API = "http://localhost:8085";

  constructor(private http: HttpClient, private router: Router ,private userService:UserService){
    this.post2.id = 0;

  }

  addPost(post: Post) : Observable<Post> {
    return this.http.post<Post>(this.PATH_OF_API + "/post/add", post);


  }
}
