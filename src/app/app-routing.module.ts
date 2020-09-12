import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessagesComponent } from "./messages/messages.component";
import { ChatSettingsComponent } from './chats/chat-settings/chat-settings.component';


const routes: Routes = [
  { path: 'chat/:id', component: MessagesComponent },
  { path: 'chat-settings/:id', component: ChatSettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
