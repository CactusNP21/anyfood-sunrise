import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AnyfoodInputComponent } from '@anyfood/ui';
import { form, FormField } from '@angular/forms/signals';
import { ICreateCategoryRequest } from '../../../../../core/clients/category/models/category-client.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeCategoryClient } from '../../../../../core/clients/recipe-category/recipe-category.client';

@Component({
  selector: 'app-recipe-categories-editor',
  imports: [AnyfoodInputComponent, FormField],
  templateUrl: './recipe-categories-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCategoriesEditorComponent {
  categoryClient = inject(RecipeCategoryClient);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  $categoryFormModel = signal<ICreateCategoryRequest>({
    name: '',
  });

  categoryForm = form(this.$categoryFormModel);

  createCategory() {
    const formValue = this.categoryForm().value();
    this.categoryClient.create(formValue).subscribe((response) => {
      this.router.navigate(['../details', response.id], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
