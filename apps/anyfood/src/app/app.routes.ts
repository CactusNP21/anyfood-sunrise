import {Route} from '@angular/router';
import {DishComponent} from "./apps/dish/dish.component";
import {DishService} from "./apps/shared/data-access/services/dish.service";
import {HomeService} from "./apps/shared/data-access/services/home.service";

export const appRoutes: Route[] = [
  // {path: 'dish', loadComponent: () => import('apps/anyfood/src/app/apps/dish/dish.component').then(c => c.DishComponent), providers: [DishService]},
  // {path: 'home', loadComponent: () => import('apps/anyfood/src/app/apps/home/home.component').then(c => c.HomeComponent), providers: [HomeService]},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dish-constructor',
  },
  {
    path: 'dish-constructor',
    loadComponent: () => import('apps/anyfood/src/app/apps/dish-constructor/view/dish-constructor.component').then(c => c.DishConstructorComponent)
  },
];
