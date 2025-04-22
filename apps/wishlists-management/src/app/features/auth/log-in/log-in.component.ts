import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FirebaseService } from '../../../firebase/firebase.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, MatButton],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  private firebase: FirebaseService = inject(FirebaseService);

  public logIn() {
    this.firebase.logInWithEmail();
  }
}
