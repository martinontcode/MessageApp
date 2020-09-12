import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
// Import HttpClient modules to simulate a data server
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemoryDataService } from "./in-memory-data.service";
import { ChatsComponent } from './chats/chats.component';
import { ChatSettingsComponent } from './chats/chat-settings/chat-settings.component';
import { ChatSearchComponent } from './chats/chat-search/chat-search.component';
<<<<<<< HEAD
import { UsersComponent } from './users/users.component';
=======
import { NavbarComponent } from './navbar/navbar.component';
>>>>>>> 96c0132ae03cb1b475488b8bf96f09b2f73ad48d

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    ChatsComponent,
    ChatSettingsComponent,
    ChatSearchComponent,
<<<<<<< HEAD
    UsersComponent
=======
    NavbarComponent
>>>>>>> 96c0132ae03cb1b475488b8bf96f09b2f73ad48d
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP request
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive request.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
