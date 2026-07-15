import { Routes } from '@angular/router';
import { isAuthGuard } from '../auth/guards/is-auth.guard';

export const RECIPE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./features/recipe-list/recipe-list.component').then(
            (m) => m.RecipeListComponent,
          ),
        title: 'Продукти',
      },
      {
        canActivate: [isAuthGuard],
        path: 'create',
        loadComponent: () =>
          import('./features/recipe-editor/recipe-editor.component').then(
            (m) => m.RecipeEditorComponent,
          ),
        title: 'Створення рецепту',
      },
      {
        canActivate: [isAuthGuard],
        path: 'edit/:id',
        loadComponent: () =>
          import('./features/recipe-editor/recipe-editor.component').then(
            (m) => m.RecipeEditorComponent,
          ),
        title: 'Редагування рецепту',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/recipe-details/recipe-details.component').then(
            (m) => m.RecipeDetailsComponent,
          ),
        title: 'Рецепт',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ],
  },
];
;
