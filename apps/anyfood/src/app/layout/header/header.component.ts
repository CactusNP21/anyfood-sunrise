import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import { AuthFacade } from '../../apps/auth/data-access/facades/auth.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authFacade = inject(AuthFacade);

  readonly currentUser = this.authFacade.currentUser;
  readonly $isMenuOpen = signal(false);

  toggleMenu() {
    this.$isMenuOpen.update((v) => !v);
  }

  logout() {
    this.$isMenuOpen.set(false);
    this.authFacade.logout();
  }

  router = inject(Router);

  $rightRoutes = signal([
    {
      path: 'recipes',
      label: 'Рецепти',
    },
    {
      path: 'dish-list',
      label: 'Список страв',
    },
  ]);

  $leftRoutes = signal([
    {
      path: 'product-list',
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
  ]);
}
