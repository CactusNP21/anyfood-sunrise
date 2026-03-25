import { Routes } from '@angular/router';
import { isAuthGuard } from '../auth/guards/is-auth.guard';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    canActivate: [isAuthGuard],
    loadComponent: () =>
      import('./view/profile.component').then(
        (m) => m.ProfileComponent
      ),
    title: 'Профіль — AnyFood',
  },
];
