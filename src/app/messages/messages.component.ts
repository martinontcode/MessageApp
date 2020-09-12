import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { ChatMessage } from '../chatmessage';
import { CHATMESSAGES } from '../mock-chatmessages';
import { ChatmessageService } from "../chatmessage.service";
import { Chat } from '../chat';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Define component property called messages to expose CHATMESSAGES array for binding
  messages: ChatMessage[];

  getChatMessages(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.chatMessageService.getChatMessages()
        .subscribe(chatmessages => this.messages = chatmessages.filter(chatfilter => chatfilter.chatid === id))
    // this.messages = this.chatMessageService.getChatMessages();
  }

  add(content: string): void{
    // Username is set as a constant until user component is created.
    const username = 'Admin';
    // Get chat id from URL
    const chatid = +this.route.snapshot.paramMap.get('id');

    // Set dynamic property for datetime.
    var today = new Date();
    var currentDate = today.toLocaleDateString();
    var currentTime = today.toLocaleTimeString();
    var date = currentDate+' '+currentTime;

    content = content.trim();
    if (!content) { return; }
    this.chatMessageService.addChatMessage( { chatid, username, content, date } as ChatMessage)
        .subscribe(chatmessage => {
          this.messages.push(chatmessage);
        });
  }

  constructor(
    private chatMessageService: ChatmessageService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getChatMessages();
      }
    )
  }
}
