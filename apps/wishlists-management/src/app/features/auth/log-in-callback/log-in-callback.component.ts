import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../../firebase/firebase.service';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

@Component({
  selector: 'app-log-in-callback',
  imports: [],
  templateUrl: './log-in-callback.component.html',
  styleUrl: './log-in-callback.component.css',
})
export class LogInCallbackComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);

  public ngOnInit(): void {
    if (isSignInWithEmailLink(this.firebaseService.auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again:
        email = window.prompt('Please provide your email for confirmation');
      }

      if (!email) {
        throw new Error('Email address is required for sign-in.');
      }

      signInWithEmailLink(this.firebaseService.auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');

          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
