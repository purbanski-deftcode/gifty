import { Routes } from '@angular/router';

export const WISHLISTS_ROUTES: Routes = [
  {
    path: 'wishlists',
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('./overview/overview.component').then(
            (m) => m.OverviewComponent
          ),
      },
    ],
  },
];
