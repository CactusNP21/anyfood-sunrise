import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import(
            './features/categories-list/view/categories-list.component'
          ).then((m) => m.CategoriesListComponent),
        title: 'Категорії',
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './features/categories-editor/view/categories-editor.component'
          ).then((m) => m.CategoriesEditorComponent),
        title: 'Категорії',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './features/category-detail/view/category-detail.component'
          ).then((m) => m.CategoryDetailComponent),
        title: 'Категорії',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];
