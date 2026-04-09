import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./apps/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./apps/categories/categories.routes').then(
        (m) => m.CATEGORIES_ROUTES,
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./apps/products/products.routes').then((m) => m.PRODUCT_ROUTES),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./apps/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./apps/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'dish-list',
    loadComponent: () =>
      import('./apps/dish-list/dish-list.component').then(
        (c) => c.DishListComponent,
      ),
  },
];
