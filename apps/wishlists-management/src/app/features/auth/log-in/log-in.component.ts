import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { FirebaseService } from '../../../firebase/firebase.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, MatButton],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  private firebase: FirebaseService = inject(FirebaseService);

  ngOnInit() {
    this.firebase.auth.onAuthStateChanged((user) => {
      console.log(user);
    })
  }

  public logIn() {
    const actionCodeSettings = {
      url: 'http://localhost:4200/auth/log-in-callback',
      handleCodeInApp: true,
    };

    const email = 'p.urbanski.90@gmail.com';

    sendSignInLinkToEmail(this.firebase.auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  }
}
