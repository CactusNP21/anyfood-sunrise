import { Route } from '@angular/router';

export const DAY_PLAN_ROUTES: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./features/day-plan-detail/day-plan-detail.component').then(m => m.DayPlanDetailComponent),
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./features/day-plan-list/day-plan-list.component').then(
            (m) => m.DayPlanListComponent,
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/day-plan-editor/day-plan-editor.component').then(
            (m) => m.DayPlanEditorComponent,
          ),
      },
    ],
  },
];
