import { Component, OnInit } from '@angular/core';
import { Chat } from '../chat';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  chat: Chat = {
    id: 1,
    name: 'Custom Chat Header',
    picture: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

}
