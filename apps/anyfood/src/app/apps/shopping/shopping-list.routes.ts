import { Routes } from '@angular/router';

export const SHOPPING_LIST_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent: () => import('./features/shopping-list/shopping-list.component').then(m => m.ShoppingListComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./features/shopping-list-generator/shopping-list-generator.component').then(m => m.ShoppingListGeneratorComponent),
      }
    ],
  },
];
