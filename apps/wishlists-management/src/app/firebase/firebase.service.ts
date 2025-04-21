import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, connectAuthEmulator } from 'firebase/auth';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  public readonly auth: Auth;

  private readonly app: FirebaseApp;

  public constructor() {
    this.app = initializeApp(environment.firebase);
    this.auth = getAuth(this.app);

    if (environment.useEmulators) {
      connectAuthEmulator(this.auth, 'http://localhost:9099');
    }
  }
}
