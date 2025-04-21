import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'log-in',
        loadComponent: () =>
          import('./log-in/log-in.component').then(
            (m) => m.LogInComponent
          ),
      },
      {
        path: 'log-in-callback',
        loadComponent: () =>
          import('./log-in-callback/log-in-callback.component').then(
            (m) => m.LogInCallbackComponent
          ),
      },
    ],
  },
];
