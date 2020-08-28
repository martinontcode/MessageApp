import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { ChatMessage } from "./chatmessage";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const chatmessages = [
      {id: 1, username: 'Admin', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '25.08.2020 12:20:00'},
      {id: 2, username: 'Admin', content: 'Nunc cursus vestibulum felis.', date: '25.08.2020 12:21:00'},
      {id: 3, username: 'Guest', content: 'Ut vitae fringilla nisl.', date: '25.08.2020 12:22:00'},
      {id: 4, username: 'Admin', content: 'Praesent sed rhoncus purus, ut tristique nisi.', date: '25.08.2020 12:23:00'},
      {id: 5, username: 'Guest', content: 'Vestibulum vehicula eleifend tincidunt.', date: '25.08.2020 12:24:00'},
      {id: 6, username: 'Admin', content: 'Integer laoreet elementum augue et tristique.', date: '25.08.2020 12:25:00'}
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
