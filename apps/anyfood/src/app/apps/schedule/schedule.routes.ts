import { Route } from '@angular/router';

export const ScheduleRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'day-plan',
        loadChildren: () =>
          import('./features/day-plan/day-plan.routes').then(
            (m) => m.DAY_PLAN_ROUTES,
          ),
        title: 'План дня',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'day-plan',
      },
    ],
  },
];
