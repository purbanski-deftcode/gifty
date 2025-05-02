import { Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';

export const WISHLISTS_ROUTES: Routes = [
  {
    path: 'wishlists',
    canActivate: [authGuard],
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('./overview/wishlists-overview.component').then(
            (m) => m.WishlistsOverviewComponent
          ),
      },
      {
        path: 'editor',
        children: [
          {
            path: 'new',
            loadComponent: () =>
              import('./editor/editor.component').then(
                (m) => m.EditorComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./editor/editor.component').then(
                (m) => m.EditorComponent
              ),
          },
        ]
      },
    ],
  },
];
