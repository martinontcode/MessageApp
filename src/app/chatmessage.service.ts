import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ChatMessage } from "./chatmessage";
import { CHATMESSAGES } from "./mock-chatmessages";

@Injectable({
  providedIn: 'root'
})
export class ChatmessageService {

  private chatmessagesUrl = 'api/chatmessages'; // URL to web api

  getChatMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.chatmessagesUrl);
  }

  constructor(
    private http: HttpClient
  ) { }
}
