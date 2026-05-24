import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CategoryClient } from '../../../../../core/clients/category/category.client';
import { RouterLink } from '@angular/router';
import { ICategoryResponse } from '../../../../../core/clients/category/models/category-client.model';
import { AuthFacade } from '../../../../auth/data-access/facades/auth.facade';

@Component({
  selector: 'app-categories-list',
  imports: [RouterLink],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesListComponent {
  categoriesClient = inject(CategoryClient);

  $categories = signal<ICategoryResponse[]>([]);

  private readonly authFacade = inject(AuthFacade);

  readonly $isAdmin = this.authFacade.isAdmin;

  ngOnInit() {
    this.categoriesClient.getAll().subscribe((response) => {
      this.$categories.set(response);
    });
  }
}
