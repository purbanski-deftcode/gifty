import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in-callback',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './log-in-callback.component.html',
  styleUrl: './log-in-callback.component.scss',
})
export class LogInCallbackComponent implements OnInit {
  public readonly isLoading = signal(true);

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  public ngOnInit(): void {
    this.authService.handleLogInWithEmail()
      .subscribe({
        next: async () => {
          this.isLoading.set(false);

          await this.router.navigate(['/']);
        },
        error: async () => {
          this.isLoading.set(false);

          this.snackBar.open('Wystąpił błąd podczas logowania. Spróbuj ponownie.', 'Zamknij', {
            duration: 5000,
          });

          await this.router.navigate(['/auth/log-in']);
        }
      });
  }
}
