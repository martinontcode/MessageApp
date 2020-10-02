import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Message } from '../_models/message';
import { MessageService } from "../_services/message.service";
import { Chat } from '../_models/chat';
import { ChatService } from '../_services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Define component property called messages to expose CHATMESSAGES array for binding
  messages: Message[];
  chat: Chat;
  loading: boolean = false;

  getMessages(): void{
    const cid = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.messageService.getMessages(cid)
        .subscribe(messages => {
          this.loading = false;
          this.messages = messages;
        });
  }

  getChatProperties(): void {
    const cid = this.route.snapshot.paramMap.get('id');
    this.chatService.getChatSettings(cid)
        .subscribe(chatproperties => this.chat = chatproperties)
  }

  addMessage(messageContent: string): void{

    // Trim input
    messageContent = messageContent.trim();

    // Get chat id from URL
    const cid = this.route.snapshot.paramMap.get('id');

    // Check if input is not null
    if (!messageContent) { return; }

    // Call for Message Service addMessage method, wait for reply
    this.messageService.addMessage( {cid, messageContent } as Message);
  }

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const cid = +params['id'];
        this.getMessages();
        this.getChatProperties();
      }
    )
  }
}
