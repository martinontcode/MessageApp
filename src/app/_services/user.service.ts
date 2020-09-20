import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../user';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = "/api/test";
  $userSettingsChanged = new EventEmitter();
  user$: Observable<User>;

  getUserProperties(): Observable<User> {
    return this.auth.user$;
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

  notifyUserChange() {
    const userChanged = 'User settings have changed';
    this.$userSettingsChanged.emit();
  }

  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + '/all', {
      responseType: 'text'
    });
  }

  getUserContent(): Observable<any> {
    return this.http.get(this.API_URL + '/user', {
      responseType: 'text'
    });
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private database: AngularFirestore
  ) { }
}
