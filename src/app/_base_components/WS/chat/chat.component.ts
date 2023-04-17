import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from "../../../_services/chat.service";
import {UserService} from "../../../_services/user.service";
import {Message} from "../../../models/message";
import {User} from "../../../models/user";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
 /* // Holding the chat messages
  messages!: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  m!: string;
  a!: string;
  @Input('m')
  set setsender(value: string) {
    this.m = value;
  }
  @Input('a')
  set setreciver(value: string) {
    this.a = value;
  }


  constructor(public chatService: ChatService, private userService : UserService) {
    this.userService.getCurrentUser()
  }
  ngOnInit(): void {
    this.username = this.currentUser.email;
    console.log(this.a, this.m);
  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
 // sendMessage(event: any, avatar: string) {
 //   let obj: Message = {
 //     text: this.messages,
 //     avatar: avatar,
 //     username: this.username,
 //     sender: '0',
 //     idchat: '0'
  //  };
   // console.log(this.a, this.m);

  //  this.chatService.sendMessage(obj);
  //}*/
}
