import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator, User, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { environment } from '../../environments/environment';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

    this.auth.onAuthStateChanged((user) => {
      userSubject.next(user);
    });
  }

  public async logInWithEmail(email: string) {
    const actionCodeSettings = {
      url: 'http://localhost:4200/auth/log-in-callback',
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);

    window.localStorage.setItem('emailForSignIn', email);
  }

  public async handleLogInWithEmail() {
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

      await signInWithEmailLink(this.auth, email, window.location.href);

      window.localStorage.removeItem('emailForSignIn');
    } else {
      throw new Error('Invalid sign-in link.');
    }
  }
}
