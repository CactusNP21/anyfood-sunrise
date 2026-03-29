import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { AnyfoodInputComponent } from '@anyfood/ui';
import { form, FormField, schema } from '@angular/forms/signals';
import { ICreateCategoryRequest } from '../../../../../core/clients/category/models/category-client.model';
import { CategoryClient } from '../../../../../core/clients/category/category.client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-editor',
  imports: [AnyfoodInputComponent, FormField],
  templateUrl: './categories-editor.component.html',
  styleUrl: './categories-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesEditorComponent {
  categoryClient = inject(CategoryClient);
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
