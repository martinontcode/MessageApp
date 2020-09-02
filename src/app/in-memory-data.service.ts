import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { ChatMessage } from "./chatmessage";
import { Chat } from "./chat";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const chats = [
      {id: 1, name: 'Custom Chat One', picture: 'https://png.pngtree.com/element_origin_min_pic/17/08/01/b62d08d09275d0d662a769e2e08e1e9c.jpg'},
      {id: 2, name: 'Custom Chat Two', picture: 'https://www.goodfreephotos.com/albums/vector-images/corgi-dog-vector-clipart.png'},
      {id: 3, name: 'Custom Chat Three', picture: 'https://previews.123rf.com/images/briang77/briang771512/briang77151200718/49536874-cow-vector-cartoon-illustration.jpg'}
    ];
    const chatmessages = [
      {id: 1, chatid: 1, username: 'Admin', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', date: '25.08.2020 12:20:00'},
      {id: 2, chatid: 1, username: 'Admin', content: 'Nunc cursus vestibulum felis.', date: '25.08.2020 12:21:00'},
      {id: 3, chatid: 3, username: 'Guest', content: 'Ut vitae fringilla nisl.', date: '25.08.2020 12:22:00'},
      {id: 4, chatid: 2, username: 'Admin', content: 'Praesent sed rhoncus purus, ut tristique nisi.', date: '25.08.2020 12:23:00'},
      {id: 5, chatid: 2, username: 'Guest', content: 'Vestibulum vehicula eleifend tincidunt.', date: '25.08.2020 12:24:00'},
      {id: 6, chatid: 2, username: 'Admin', content: 'Integer laoreet elementum augue et tristique.', date: '25.08.2020 12:25:00'}
    ];
    return {chats, chatmessages};
  }

  // Overrides the genId method to ensure that a chatmessage always has an id.
  // If the chatmessages array is empty the method below returns the initial number (1).
  // if the heroes array is not empty, the method below returns the highest hero id + 1
  genChatId(chats: Chat[]): number {
    return chats.length > 0 ? Math.max(...chats.map(chat => chat.id)) + 1 : 1;
  }
  genId(chatmessages: ChatMessage[]): number {
    return chatmessages.length > 0 ? Math.max(...chatmessages.map(chatmessage => chatmessage.id))
    + 1 : 1;
  }
}
