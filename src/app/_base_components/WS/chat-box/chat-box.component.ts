import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent  implements OnInit{
  // The entered username
  username = '';
  // will hold a random theme for the chat component
  selectedTheme = '';
  // will hold a random avatar for the chat component
  selectedAvatar = '';
  // Detect when the user clicked on 'START'
  isReady = false;
  currentUser: User = new User();

  // List of themes and avatars to pass one randomly to the chat component
  themes = ['primary', 'warning', 'info', 'success'];
  avatars = [

  ];

  // Select one random avatar and theme for every chat component
  constructor( private userService : UserService) {
    this.userService.getCurrentUser()
  }


  chat() {
    this.isReady = true;
  }

  ngOnInit(): void {
  }

}
