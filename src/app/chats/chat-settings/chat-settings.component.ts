import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Chat } from '../../chat';
import { ChatService } from "../../chat.service";

@Component({
  selector: 'app-chat-settings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css']
})
export class ChatSettingsComponent implements OnInit {

  chat: Chat[];

  getChatProperties(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.chatService.getChatProperties()
        .subscribe(chatproperties => this.chat = chatproperties.filter(chatfilter => chatfilter.id === id))
  }

  goBack(): void {
    this.location.back();
  }

  saveChatSettings(picture: string, name: string): void{
    // Trim input
    picture = picture.trim();
    name = name.trim();

    // Get ID from URL
    const id = +this.route.snapshot.paramMap.get('id');

    if(!picture || !name){
      return;
    };

    this.chatService.saveChatSettings( {id, name, picture} as Chat )
      .subscribe();

    this.chatService.notifyChange();
  }

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getChatProperties();
      }
    )
  }
}
