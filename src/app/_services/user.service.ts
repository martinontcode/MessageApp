import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = "/api/test";

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
    private http: HttpClient
  ) { }
}
