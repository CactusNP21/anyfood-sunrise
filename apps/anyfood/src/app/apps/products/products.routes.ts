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
      // {
      //   path: 'create',
      //   loadComponent: () =>
      //     import(
      //       './features/categories-editor/view/categories-editor.component'
      //     ).then((m) => m.CategoriesEditorComponent),
      //   title: 'Категорії',
      // },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './features/product-details/product-details.component'
          ).then((m) => m.ProductDetailsComponent),
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
