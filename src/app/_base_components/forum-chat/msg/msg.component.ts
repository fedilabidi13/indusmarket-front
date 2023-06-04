import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {ChatService} from "../../../_services/chat.service";
import {UserService} from "../../../_services/user.service";
import {Message} from "../../../models/message";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Chatroom} from "../../../models/chatroom";

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  // Holding the chat messages
  messages: string;
  username: string = '';
  theme: string = '';
  avatar: string = '';
  currentUser: User = new User();
  m: string;
  a: string;
  email!: string;
  public users: User[]=[];
  pageSize = 10; // Number of items to display per page
  currentPage = 1; //
  user !: User;
  msgForm: FormGroup;
  public chatroom: Chatroom[]=[];

  @Input('m')
set setsender(value: string) {
    this.m = value;
  }
@Input('a')
set setreciver(value: string) {
    this.a = value;
  }


  constructor(public chatService: ChatService, private authenticationService: UserService , private fb: FormBuilder) {
    this.currentUser = this.authenticationService.getCurrentUser()
    console.log(this.authenticationService.getCurrentUser())
  }
  ngOnInit(): void {
    this.username = this.authenticationService.getCurrentUser().firstName.toString();
    console.log(this.username)
    console.log(this.a, this.m);
    this.authenticationService.getAllMods().subscribe(res =>{
      this.users=res
      console.log(this.users)

    })
    this.msgForm = this.fb.group({
      postTitle: '',
    });
    this.user= this.authenticationService.getCurrentUser()
    this.chatService.GetAllChats()
      .subscribe(res=>{
        this.chatroom = res;
        console.log(this.chatroom)
      })

  }

  // Prepare the chat message then call the chatService method 'sendMessage' to actually send the message
  sendMessage(event: any, avatar: string) {
    let obj: Message = {
      text: this.messages,
      avatar: avatar,
      username: this.authenticationService.getCurrentUser().firstName.toString(),
      sender: '0',
      idchat: '0'
    };
    console.log(this.a, this.m);

    this.chatService.sendMessage(obj);
  }
}
