import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { ChatMessage } from "./chatmessage";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const chatmessages = [
      {id: 1, username: 'Admin', content: 'Message 1', date: '25.08.2020 12:20:00'},
      {id: 2, username: 'Admin', content: 'Message 2', date: '25.08.2020 12:21:00'},
      {id: 3, username: 'Guest', content: 'Message 3', date: '25.08.2020 12:22:00'},
      {id: 4, username: 'Admin', content: 'Message 4', date: '25.08.2020 12:23:00'},
      {id: 5, username: 'Guest', content: 'Message 5', date: '25.08.2020 12:24:00'},
      {id: 6, username: 'Admin', content: 'Message 6', date: '25.08.2020 12:25:00'}
    ];
    return {chatmessages};
  }

  // Overrides the genId method to ensure that a chatmessage always has an id.
  // If the chatmessages array is empty the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest hero id + 1
  genId(chatmessages: ChatMessage[]): number {
    return chatmessages.length > 0 ? Math.max(...chatmessages.map(chatmessage => chatmessage.id))
    + 1 : 1;
  }
}
