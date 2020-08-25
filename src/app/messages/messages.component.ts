import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chatmessage';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message: ChatMessage = {
    id: 1,
    username: 'Admin',
    content: 'Test message',
    date: '25.08.2020 11:32:00'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
