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
import { RecipeCategoryClient } from '../../../../../core/clients/recipe-category/recipe-category.client';

@Component({
  selector: 'app-recipe-categories-list',
  imports: [RouterLink],
  templateUrl: './recipe-categories-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCategoriesList {
  categoriesClient = inject(RecipeCategoryClient);

  $categories = signal<ICategoryResponse[]>([]);

  private readonly authFacade = inject(AuthFacade);

  readonly $isAdmin = this.authFacade.isAdmin;

  ngOnInit() {
    this.categoriesClient.getAll().subscribe((response) => {
      this.$categories.set(response);
    });
  }
}
