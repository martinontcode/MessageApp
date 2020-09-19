import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate } from "@angular/fire/auth-guard";
import { MessagesComponent } from "./messages/messages.component";
import { ChatSettingsComponent } from './chats/chat-settings/chat-settings.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'chat/:id', component: MessagesComponent,    ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'chat-settings/:id', component: ChatSettingsComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
