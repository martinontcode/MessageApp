import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { MessagesComponent } from "./messages/messages.component";
import { ChatSettingsComponent } from './chats/chat-settings/chat-settings.component';
import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { WelcomeComponent } from './welcome/welcome.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '', component: WelcomeComponent , ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'chat/:id', component: MessagesComponent,    ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'chat-settings/:id', component: ChatSettingsComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'user-settings/:uid', component: UserSettingsComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'register', component: RegisterComponent,    ...canActivate(redirectLoggedInToHome) },
  { path: 'login', component: LoginComponent,    ...canActivate(redirectLoggedInToHome)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
