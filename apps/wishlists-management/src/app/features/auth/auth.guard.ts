import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { take, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserLoggedIn().pipe(
    take(1),
    tap(async (val) => {
      if (!val) {
        await router.navigate(['auth', 'log-in']);
      }
    })
  );
};
