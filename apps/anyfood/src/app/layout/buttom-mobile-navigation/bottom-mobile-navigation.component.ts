import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-mobile-navigation',
  templateUrl: './bottom-mobile-navigation.component.html',
  imports: [RouterLinkActive, RouterLink],
})
export class BottomMobileNavigationComponent {
  sections = [
    {
      path: '/recipes',
      name: 'Рецепти',
    },
    {
      path: '/schedule',
      name: 'Меню',
    },
    {
      path: '/shopping-list',
      name: 'Список покупок',
    },
    {
      path: '/profile',
      name: 'Акаунт',
    },
  ] as const;
}
