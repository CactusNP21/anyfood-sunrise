import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./features/product-list/product-list').then(
            (m) => m.ProductList,
          ),
        title: 'Продукти',
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/product-editor/product-editor.component').then(
            (m) => m.ProductEditorComponent,
          ),
        title: 'Створення продукту',
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/product-editor/product-editor.component').then(
            (m) => m.ProductEditorComponent,
          ),
        title: 'Редагування продукту',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent,
          ),
        title: 'Products',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];
