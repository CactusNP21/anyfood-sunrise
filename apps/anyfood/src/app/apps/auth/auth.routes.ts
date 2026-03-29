import { Routes } from '@angular/router';
import { CategoryClient } from '../../core/clients/category/category.client';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./view/components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Вхід — AnyFood',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./view/components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Реєстрація — AnyFood',
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];
