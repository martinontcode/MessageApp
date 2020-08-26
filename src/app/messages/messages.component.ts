import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chatmessage';
import { CHATMESSAGES } from '../mock-chatmessages';
import { ChatmessageService } from "../chatmessage.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Define component property called messages to expose CHATMESSAGES array for binding
  messages: ChatMessage[];

  // Deprecated code
  message: ChatMessage = {
    id: 1,
    username: 'Admin',
    content: 'Test message',
    date: '25.08.2020 11:32:00'
  };

  getChatMessages(): void{
    this.chatMessageService.getChatMessages()
        .subscribe(chatmessages => this.messages = chatmessages)
    // this.messages = this.chatMessageService.getChatMessages();
  }

  constructor(private chatMessageService: ChatmessageService) { }

  ngOnInit(): void {
    this.getChatMessages();
  }

}
