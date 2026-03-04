import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  router = inject(Router);

  $rightRoutes = signal([
    {
      path: 'recipes',
      label: 'Рецепти',
    },
    {
      path: "dish-list",
      label: 'Список страв',
    },
  ]);

  $leftRoutes = signal([
    {
      path: 'food-cart',
      label: 'Кошик продуктів',
    },
    {
      path: 'glossary',
      label: 'Глосарій',
    },
    {
      path: 'account',
      label: 'Акаунт',
    },
  ])
}
