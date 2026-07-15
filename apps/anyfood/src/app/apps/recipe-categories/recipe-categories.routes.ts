import { Routes } from '@angular/router';

export const RECIPE_CATEGORIES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import(
            './features/recipe-categories-list/view/recipe-categories-list.component'
          ).then((m) => m.RecipeCategoriesList),
        title: 'Категорії',
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './features/recipe-categories-editor/view/recipe-categories-editor.component'
          ).then((m) => m.RecipeCategoriesEditorComponent),
        title: 'Категорії',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import(
            './features/recipe-category-detail/view/recipe-category-detail.component'
          ).then((m) => m.RecipeCategoryDetailComponent),
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
