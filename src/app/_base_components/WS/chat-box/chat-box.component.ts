import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {UserService} from "../../../_services/user.service";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent {
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
  'https://mir-s3-cdn-cf.behance.net/user/115/24e8af100183223.59cbd13b396ba.png',
  'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/default.png?raw=true',
  'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs3.png?raw=true',
  'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs4.png?raw=true',
  'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs5.png?raw=true',
  'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs6.png?raw=true',
  'https://github.com/Houssem-Selmi/booki/blob/master/Booki-Back-end/upload-dir/hs7.png?raw=true'
];

// Select one random avatar and theme for every chat component
constructor( private authenticationService: UserService) {
  /*this.use.currentUser.subscribe( data => {
    this.currentUser = data;
  });*/
}


chat() {
  this.isReady = true;
}
}
