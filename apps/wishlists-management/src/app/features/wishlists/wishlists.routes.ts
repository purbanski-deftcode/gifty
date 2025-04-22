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
