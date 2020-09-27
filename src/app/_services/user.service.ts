import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from '../user';
import { AuthService } from './auth.service';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<User>;

  getUserProperties(): Observable<User> {
    return this.auth.user$;
  }

  getUserData(): Observable<User> {
    const uid = this.auth.currentUser();
    return this.database.doc<User>(`users/${uid}`).valueChanges();
    // return {displayName: 'Seth', displayPicture: 'https://img1.pnghut.com/5/1/1/MyAnaYgZrU/spiderman-monochrome-emoticon-photography-smile.jpg', email: 'test@test.ee', uid: 'I8GZEpDbFCgyeRC20wrLQauoCIY2'}
  }

  saveUserSettings(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.database.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      displayPicture: user.displayPicture
    }

    return userRef.set(data, { merge: true });
  }

  // newUserToFirebase(user: any) {
  //   // User created now create Firebase Database user
  //   this.database.object(`/users/${user.uid}`).update({
  //     firstName: formData.value.firstName,
  //     lastName: formData.value.lastName
  //     });
  // }

  constructor(
    private auth: AuthService,
    private database: AngularFirestore
  ) {
  }
}
