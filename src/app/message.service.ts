import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Message } from "./message";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { UserService } from './_services/user.service';
import { User } from "./user";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesCollection: AngularFirestoreCollection<Message>;
  messages$: Observable<Message[]>;
  user: User;

  getMessages(cid: string): Observable<any[]> {
    return this.database.collection<Message>('messages', ref => ref.where('cid', '==', cid)
      .orderBy('messageTimestamp','asc')).valueChanges();
  }

  async addMessage(message: Message) {

    // Create new message id (mid)
    const mid = this.database.createId();
    // Get current user id (uid) from auth service
    const uid = this.user.uid;

    // Set cid and messageContent (Input received from messages back-end)
    const cid = message.cid;
    const messageContent = message.messageContent;

    await this.messagesCollection.doc(mid).set({
      mid,
      cid,
      uid,
      messageContent,
      messageTimestamp: firestore.FieldValue.serverTimestamp(),
      displayName: this.user.displayName,
      displayPicture: this.user.displayPicture
    });

  }

  constructor(
    private database: AngularFirestore,
    private userService: UserService
  ) {
    this.messagesCollection = database.collection<Message>('messages');
    this.messages$ = this.messagesCollection.valueChanges();
    this.userService.getUserData().subscribe(
      // userData = Name that we give to returned data from userService getUserData() function
      // userData = {displayName: 'Seth', displayPicture: 'https://img1.pnghut.com/5/1/1/MyAnaYgZrU/spiderman-monochrome-emoticon-photography-smile.jpg', email: 'test@test.ee', uid: 'I8GZEpDbFCgyeRC20wrLQauoCIY2'}
      userData =>
      // Put userData into user attribute that we created before
      this.user = userData
    )
  }
}
