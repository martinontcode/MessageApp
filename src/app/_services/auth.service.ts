import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";

import { Observable, of, merge } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from '../user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User>;

  async credentialSignIn(email: string, password: string) {
    const credential = await this.afauth.signInWithEmailAndPassword(email, password);
    return this.updateUserData(credential.user);
  }

  private updateUserData({ uid, email, displayName }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afstore.doc(`users/${uid}`);

    const data = {
      uid: uid,
      email: email,
      displayName: displayName
    }

    return userRef.set(data, { merge: true });
  }


  constructor(
    private afauth: AngularFireAuth,
    private afstore: AngularFirestore
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.afstore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
