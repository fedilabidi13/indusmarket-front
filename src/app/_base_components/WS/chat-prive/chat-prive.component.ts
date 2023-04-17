import {Component, OnInit} from '@angular/core';
import {Chatroom} from "../../../models/chatroom";
import {User} from "../../../models/user";
import {Router} from "@angular/router";
import {ChatService} from "../../../_services/chat.service";
import {UserService} from "../../../_services/user.service";
import {Subscription} from "rxjs";
import {Message} from "../../../models/message";

@Component({
  selector: 'app-chat-prive',
  templateUrl: './chat-prive.component.html',
  styleUrls: ['./chat-prive.component.scss']
})
export class ChatPriveComponent {
 /* // Holding the chat messages
  private routeSub!: Subscription;
  //mess: Message = new Message();
  chhh!: Chatroom[];
  ch: Chatroom = new Chatroom();
  chatLists!: Chatroom[];
  messages!: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  users!: User[];
  map: Map<number, Chatroom> = new Map();
  map2: Map<number, string> = new Map();
  map3: Map<number, string> = new Map();


  constructor(private router: Router, public chatService: ChatService, private userService : UserService) {
    this.userService.getCurrentUser()

  }

  ngOnInit(): void {
    this.routeSub = this.chatService.getchatroom('1', '2').subscribe(res => {
      console.log(res);
      this.ch = res;
    });
    this.routeSub = this.chatService.GetAllUser().subscribe(res => {
      console.log(res);
      this.users = res;
    });
    this.username = this.currentUser.email;
    this.allchat();
    this.ch.color = '#EC407A';
    this.map.set(this.currentUser.id, this.ch);
    this.map2.set(this.currentUser.id, 'Start Chat');
    this.map3.set(this.currentUser.id, 'profile_user.jpg');

  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage(event: any, avatar: string) {
    let obj: Message = {
      avatar: avatar,
      idchat: `${this.map.get(this.currentUser.id)?.chatroomId}`,
      sender: this.currentUser.id.toString(),
      text: this.messages,
      username: this.username

    };

    this.chatService.sendMessage(obj);
  }

  ref({id1, id2, xx, yy}: { id1: string, id2: string, xx: string, yy: any } ) {
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
  }*/

}
