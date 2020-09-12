import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Chat } from "./chat";
import { CHATS } from "./mock-chats";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  $saved = new EventEmitter();

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

  getChatProperties(): Observable<Chat[]> {
    return this.http.get<Chat[]>(this.chatUrl);
  }

  saveChatSettings(chat: Chat): Observable<any>{
    console.log(chat);
    return this.http.put(this.chatUrl, chat, this.httpOptions);
  }

  deleteChat(chat: Chat | number): Observable<Chat> {
    const id = typeof chat === 'number' ? chat : chat.id;
    const url = `${this.chatUrl}/${id}`;

    return this.http.delete<Chat>(url, this.httpOptions);
  }

  chatSearch(name: string): Observable<Chat[]> {
    // If no search term, return empty chat array.
    if (!name.trim()) {
      return of ([]);
    }

    return this.http.get<Chat[]>(`${this.chatUrl}/?name=${name}`);
  }

  notifyChange() {
    const change = 'Settings changed';
    this.$saved.emit(change);
  }

  constructor(
    private http: HttpClient
  ) { }
}