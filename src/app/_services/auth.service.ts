import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from '../_models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userCollection: AngularFirestoreCollection<User>;
  users$: Observable<User[]>;
  user$: Observable<User>;
  uid$: string;

  async credentialSignIn(email: string, password: string) {
    const credential = await this.afauth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['']);
  }

  async credentialSignOut() {
    const signout = await this.afauth.signOut();
    this.router.navigate(['login']);
  }

  credentialSignUp(email: string, password: string) {
    this.afauth.createUserWithEmailAndPassword(email, password)
      .then(userdata => {
        return this.database.collection('users').doc(userdata.user.uid).set({
          uid: userdata.user.uid,
          email: userdata.user.email,
          // Default display picture
          displayPicture: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
          // Default display name
          displayName: userdata.user.email.substring(0, userdata.user.email.indexOf('@'))
        });
    });
  }

  currentUser() {
    return this.uid$;
  }

  constructor(
    private afauth: AngularFireAuth,
    private database: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
        if(user) {
          return this.database.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afauth.authState.subscribe(user => {
      if(user) this.uid$ = user.uid;
    });
    this.userCollection = database.collection<User>('users');
    this.users$ = this.userCollection.valueChanges();
  }
}
