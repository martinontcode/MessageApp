import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = "api/users";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  userLogin(user: User): Observable<User> {
    return this.http.post<User>(this.AUTH_API, user, this.httpOptions);
  }

  userRegister(user: User): Observable<User> {
    return this.http.post<User>(this.AUTH_API, user, this.httpOptions);
  }

  constructor(
    private http: HttpClient
  ) { }
}
