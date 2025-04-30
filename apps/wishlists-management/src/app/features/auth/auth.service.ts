import { inject, Injectable } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly firebase = inject(FirebaseService);

  public isUserLoggedIn() {
    return this.firebase.user$.pipe(
      map(user => user !== null)
    );
  }

  public logInWithEmail(email: string): Observable<void> {
    return from(this.firebase.logInWithEmail(email));
  }

  public handleLogInWithEmail(): Observable<void> {
    return from(this.firebase.handleLogInWithEmail())
  }
}
