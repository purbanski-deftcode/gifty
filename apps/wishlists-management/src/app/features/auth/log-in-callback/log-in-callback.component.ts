import { Component, inject, OnInit } from '@angular/core';
import { FirebaseService } from '../../../firebase/firebase.service';

@Component({
  selector: 'app-log-in-callback',
  imports: [],
  templateUrl: './log-in-callback.component.html',
  styleUrl: './log-in-callback.component.scss',
})
export class LogInCallbackComponent implements OnInit {
  private readonly firebaseService = inject(FirebaseService);

  public ngOnInit(): void {
    this.firebaseService.handleLogInWithEmail();
  }
}
