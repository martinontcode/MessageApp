import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Chat } from "./chat";
import { CHATS } from "./mock-chats";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatUrl = 'api/chats'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatUrl);
  }

  addChats(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(this.chatUrl, chat, this.httpOptions);
  }

  constructor(
    private http: HttpClient
  ) { }
}
