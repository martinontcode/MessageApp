import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from "../../_services/auth.service";
import { User } from 'src/app/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // user: User;
  isSignUpSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  onSubmit(email: string, password: string): void {
    // Needs to be moved to auth service
    this.auth.createUserWithEmailAndPassword(email, password).then(user => {
      console.log(user);
      this.router.navigate(['']);
    });
  }

  constructor(
    private authService: AuthService,
    public auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
