import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from '../user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User>;
  uid$: string;

  async credentialSignIn(email: string, password: string) {
    const credential = await this.afauth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['']);
    // return this.updateUserData(credential.user);
  }

  async credentialSignOut() {
    const signout = await this.afauth.signOut();
    this.router.navigate(['login']);
  }

  currentUser() {
    return this.uid$;
  }


  // private updateUserData({ uid, email, displayName }: User) {
  //   this.user: AngularFirestoreDocument<User> = this.afstore.collection(`users`);
  //   // if(displayName == null){
  //   //   displayName = 'Martin';
  //   // }

  //   // const data = {
  //   //   uid: uid,
  //   //   email: email,
  //   //   displayName: displayName
  //   // }

  //   // return userRef.set(data, { merge: true });
  // }


  constructor(
    private afauth: AngularFireAuth,
    private afstore: AngularFirestore,
    private router: Router
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
    this.afauth.authState.subscribe(user => {
      if(user) this.uid$ = user.uid;
    })
  }
}
