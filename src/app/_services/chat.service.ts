import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {Chatroom} from "../models/chatroom";
import {User} from "../models/user";
import {map} from "rxjs";
import {PostComment} from "../models/postComment";

/**
 * Declaring SockJS and Stomp : check the assets/js folder and the index.html script section
 */
declare var SockJS: any;
declare var Stomp: any;
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Store the chat messages
  public messages = [];

  public stompClient : any ;
  token!:string;
  user!:User;

  constructor(private userService : UserService, private http: HttpClient  ) {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    /**
     * Create a SockJS server with created back-end endpoint called /chat-websocket and added it over Stomp.
     */
    const serverUrl = 'http://localhost:8085/chat-websocket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    /**
     * Connect stomp client and subscribe asynchronously to the chat message-handling Controller endpoint and push any message body into the messages array
     */
    this.stompClient.connect({}, function() {
      that.stompClient.subscribe('/chat/messages', (message: { body: string; }) => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar , obj.sender, obj.chatid );
        }
      });
      that.stompClient.subscribe('/user/chat/private-messages', (message: { body: string; }) => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar, obj.sender , obj.chatid);
        }
      });
    });
  }

  // Prepare and push the chat messages into the messages array
  addMessage(message: any, username: string, avatar: string , chatid: string , sender: string) {
    // @ts-ignore
    this.messages.push({
      "text": message,
      "date": new Date(),
      "user": {
        "name": username,
        "avatar": avatar
      },
      "chatid": chatid,
      "sender": sender


    });
  }

  // Send a chat message using stomp client
  sendMessage(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }
  sendMessagep(msg: Message) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }
  getchatroom(ids: string , idr: string ) {
    this.user=this.userService.getCurrentUser()
    // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // @ts-ignore
    return this.http.get<Chatroom>('http://localhost:8085/chat/Chatroom/' + ids + '/' + idr , {headers})
      .pipe(map((res:any)=>{
        return res;
      }))
  };


color(id: string , c: string) {
  this.user=this.userService.getCurrentUser()
  // @ts-ignore
  this.token = localStorage.getItem("currentUser")
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  // @ts-ignore
  return this.http.post<string>('http://localhost:8085/chat/color/' + id , c , {headers})
    .pipe(map((res:any)=>{
      return res;
    }))
};





GetAllUser() {
  this.user=this.userService.getCurrentUser()
  this.token = localStorage.getItem("currentUser")
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<User[]>('http://localhost:8085/chat/ListUser/', {headers})
      .pipe(map((res:any)=>{
        return res;
      }))


  }
  allchat() {
  this.user=this.userService.getCurrentUser()
  // @ts-ignore
  this.token = localStorage.getItem("currentUser")
  const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  // @ts-ignore
    return this.http.get<Chatroom[]>('http://localhost:8085/chat/allchat' , {headers})
      .pipe(map((res:any)=>{
        return res;
      }))
};
  GetAllChats(){
    // this.user=this.userService.getCurrentUser()
    // // @ts-ignore
    this.token = localStorage.getItem("currentUser")
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    // // @ts-ignore
    return this.http.get<Chatroom[]>("http://localhost:8085/chat/getAll",{ headers: headers} )
      .pipe(map((res:any)=>{
        return res;
      }))
  }




}
