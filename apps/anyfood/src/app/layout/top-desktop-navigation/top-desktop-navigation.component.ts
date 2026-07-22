import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'top-desktop-navigation',
  templateUrl: 'top-desktop-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
})
export class TopDesktopNavigationComponent {
  routes = [
    // {link: '/categories', title: 'Категорії продуктів'},
    {link: '/recipe-categories', title: 'Категорії рецептів'},
    {link: '/products', title: 'Продукти'},
    {link: '/recipes', title: 'Рецепти'},
    {link: '/schedule', title: 'Розклад'},
    {link: '/shopping-list', title: 'Список покупок'},
    {link: '/fridge', title: 'Холодильник'},
  ]
}
