import {Route} from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./apps/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'create-product',
    loadComponent: () =>
      import('./apps/products/create-product/create-product.component').then(
        (c) => c.CreateProductComponent
      ),
  },
  {
    path: 'dish-constructor',
    loadComponent: () =>
      import('./apps/dish-constructor/view/dish-constructor.component').then(
        (c) => c.DishConstructorComponent
      ),
  },
  {
    path: 'dish-list',
    loadComponent: () =>
      import('./apps/dish-list/dish-list.component').then(
        (c) => c.DishListComponent
      ),
  },
  {
    path: 'product-list',
    loadComponent: () =>
      import('./apps/dish-list/dish-list.component').then(
        (c) => c.DishListComponent
      ),
  },
];
