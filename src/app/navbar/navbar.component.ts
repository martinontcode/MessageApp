import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Needs to be moved to auth.service
  signOut() {
    this.auth.credentialSignOut();
  }

  constructor(
    public auth: AuthService,
    public afauth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
  }

}
