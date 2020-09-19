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
    this.afauth.signOut();
    this.router.navigate(['login']);
  }

  constructor(
    public auth: AuthService,
    public afauth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
