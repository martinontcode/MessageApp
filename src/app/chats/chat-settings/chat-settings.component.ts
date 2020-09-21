import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { Chat } from '../../chat';
import { ChatService } from "../../chat.service";

@Component({
  selector: 'app-chat-settings',
  templateUrl: './chat-settings.component.html',
  styleUrls: ['./chat-settings.component.css']
})
export class ChatSettingsComponent implements OnInit {

  chat: Chat;
  chats: Chat[];

  getChatSettings(): void {
    const cid = this.route.snapshot.paramMap.get('id');
    this.chatService.getChatSettings(cid)
        .subscribe(chatproperties => this.chat = chatproperties);
  }

  saveChatSettings(chatPicture: string, chatName: string): void{
    // Trim input
    chatPicture = chatPicture.trim();
    chatName = chatName.trim();

    // Get ID from URL
    const cid = this.route.snapshot.paramMap.get('id');

    if(!chatPicture || !chatName){
      return;
    };

    this.chatService.saveChatSettings( {cid, chatName, chatPicture} as Chat );

    this.chatService.notifyChange();
  }

  deleteChat(): void {
    // Get ID from URL
    const cid = this.route.snapshot.paramMap.get('id');

    // Delete from database using chatService.
    this.chatService.deleteChat(cid);

    // Notify Chats component of a change in database, so getChats() would get triggered again.
    this.chatService.notifyChange();

    // Redirect user to home URL after Chat has been deleted.
    this.router.navigate(['/']);
  }

  addChatUser(uid: string): void {
    uid = uid.trim();

    // Get ID from URL
    const cid = this.route.snapshot.paramMap.get('id');

    if(!uid){
      return;
    };

    this.chatService.addChatUser(cid, uid);

  }

  goBack(): void {
    this.location.back();
  }

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = +params['id'];
        this.getChatSettings();
      }
    )
  }
}
