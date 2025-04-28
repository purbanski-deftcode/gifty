import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator, User, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { environment } from '../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public user$: Observable<User | null>;

  private readonly auth: Auth;
  private readonly app: FirebaseApp;

  public constructor() {
    const userSubject = new ReplaySubject<User | null>(1);
    this.user$ = userSubject.asObservable();

    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);

    if (environment.useEmulators) {
      connectAuthEmulator(this.auth, 'http://localhost:9099');
    }

    this.auth.onAuthStateChanged(user => {
      userSubject.next(user);
    });
  }

  public logInWithEmail() {
    const actionCodeSettings = {
      url: 'http://localhost:4200/auth/log-in-callback',
      handleCodeInApp: true,
    };

    const email = 'p.urbanski.90@gmail.com';

    sendSignInLinkToEmail(this.auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorMessage);
      });
  }

  public handleLogInWithEmail() {
    if (isSignInWithEmailLink(this.auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');

      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again:
        email = window.prompt('Please provide your email for confirmation');
      }

      if (!email) {
        throw new Error('Email address is required for sign-in.');
      }

      signInWithEmailLink(this.auth, email, window.location.href)
        .then((credentials) => {
          window.localStorage.removeItem('emailForSignIn');
          console.log(credentials.user);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
