import { HttpInterceptorFn } from '@angular/common/http';
import { FirebaseService } from '../../../firebase/firebase.service';
import { inject } from '@angular/core';
import { from, of, switchMap, take } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const firebaseService = inject(FirebaseService);

  return firebaseService.user$.pipe(
    take(1),
    switchMap((user) => user ? from(user.getIdToken()) : of(null)),
    switchMap(token => {
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      return next(req);
    })
  )
};
