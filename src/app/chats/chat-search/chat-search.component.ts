import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Chat } from 'src/app/_models/chat';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.css']
})
export class ChatSearchComponent implements OnInit {

  chats$: Observable<Chat[]>;
  private searchTerms = new Subject<string>();

  // Push a search term into the observable chats stream
  chatSearch(name: string): void {
    this.searchTerms.next(name);
  }

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chats$ = this.searchTerms.pipe(

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same term as previous term
      distinctUntilChanged(),

      // search to new search observable each time the term changes
      switchMap((name: string) => this.chatService.chatSearch(name)),

    );
  }
}
