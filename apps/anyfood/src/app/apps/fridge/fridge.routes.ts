import { Routes } from '@angular/router';

export const FRIDGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/fridge-list/fridge-list.component').then(m => m.FridgeListComponent),
  },

]
