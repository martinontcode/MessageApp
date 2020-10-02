import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../_services/auth.service";
import { TokenStorageService } from "../../_services/token-storage.service";
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // user:  User;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  onSubmit(email: string, password: string): void {
    this.authService.credentialSignIn( email, password );
    this.router.navigate(['']);
  }

  reloadPage(): void {
    window.location.reload();
  }

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }

}
