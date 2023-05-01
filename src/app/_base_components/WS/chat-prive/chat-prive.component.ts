import {Component, Input, OnInit} from '@angular/core';

import {Router} from "@angular/router";
import {Chatroom} from "../../../models/chatroom";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
import {ChatService} from "../../../_services/chat.service";
import {ForumService} from "../../../_services/forum.service";
import {UserService} from "../../../_services/user.service";
import {Message} from "../../../models/message";

@Component({
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss']
})
export class ChatPriveComponent implements OnInit {

  // Holding the chat messages
  private routeSub: Subscription;
  //mess: Message = new Message();
  chhh: Chatroom[];
  ch: Chatroom = new Chatroom();
  chatLists: Chatroom[];
  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  users: User[];
  map: Map<number, Chatroom> = new Map();
  map2: Map<number, string> = new Map();
  map3: Map<number, string> = new Map();


  constructor(private router: Router, public chatService: ChatService, private service: ForumService, private authenticationService: UserService) {

  }

  ngOnInit(): void {

    this.currentUser = this.authenticationService.getCurrentUser();
    console.log("idddddddddddd" ,this.authenticationService.getCurrentUser().id)
    this.currentUser.id = 1
    console.log("idddddddddddd" ,this.currentUser.id)
    this.routeSub = this.chatService.getchatroom('1', '3').subscribe(res => {
      console.log(res);
      this.ch = res;
    });
    this.routeSub = this.chatService.GetAllUser().subscribe(res => {
      console.log(res);
      this.users = res;
    });
    this.username = this.currentUser.firstName;
    this.allchat();
    this.ch.color = '#EC407A';
    this.map.set(this.currentUser.id, this.ch);
    this.map2.set(this.currentUser.id, 'Start Chat');
    this.map3.set(this.currentUser.id, 'profile_user.jpg');

  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage(event: any, avatar: string) {
    let obj: Message = {
      text: this.messages,
      avatar: avatar,
      username: this.username,
      idchat: '1',
      sender: this.currentUser.id.toString()

    };

    this.chatService.sendMessage(obj);
  }

  ref(id1: string, id2: string, xx: string,yy) {
    this.routeSub = this.chatService.getchatroom(id1, id2).subscribe(res => {
      console.log(res);
      this.ch = res;
      this.map.set(this.currentUser.id, this.ch);
      this.map2.set(this.currentUser.id, xx);
      this.map3.set(this.currentUser.id, yy);

      console.log(this.chatLists[res.chatroomId]);
      console.log(this.currentUser.id);
    });
  }

  // send(id: string){
  //   this.routeSub = this.service.sendmsg(this.ch.chatroomId.toString() , this.mess).subscribe(res => {
  //     console.log(res);
  //     this.allchat();
  //   });
  // }

  allchat() {
    this.routeSub = this.chatService.allchat().subscribe(res => {
      this.chhh = res;
      console.log(res);

    });
  }

  color(id: string, c: string) {
    this.chatService.color(id, c).subscribe(p => {
      console.log();
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    });
  }
}
