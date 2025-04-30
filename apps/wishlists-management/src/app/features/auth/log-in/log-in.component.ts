import { Component, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  public readonly emailField = new FormControl(
    { value: '', disabled: false },
    { nonNullable: true, validators: [Validators.required, Validators.email] }
  );

  public readonly isLoading = signal(false);
  public readonly loginSuccess = signal(false);

  private readonly authService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);

  public logIn() {
    if (this.emailField.invalid) {
      return;
    }

    this.isLoading.set(true);

    this.authService.logInWithEmail(this.emailField.value)
      .pipe(
        finalize(() => {
          this.isLoading.set(false)
        }),
      )
      .subscribe({
        next: () => {
          this.loginSuccess.set(true);
        },
        error: () => {
          // TODO: move snackbar to wrapper service
          this.snackBar.open('Wystąpił błąd podczas wysyłania linku logowania. Spróbuj ponownie.', 'Zamknij', {
            duration: 5000,
          });
        }
      });
  }
}
