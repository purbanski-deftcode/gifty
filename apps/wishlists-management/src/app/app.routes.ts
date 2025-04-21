import { Route } from '@angular/router';
import { WISHLISTS_ROUTES } from './features/wishlists/wishlists.routes';
import { AUTH_ROUTES } from './features/auth/auth.routes';

export const appRoutes: Route[] = [
  ...AUTH_ROUTES,
  ...WISHLISTS_ROUTES,
];
