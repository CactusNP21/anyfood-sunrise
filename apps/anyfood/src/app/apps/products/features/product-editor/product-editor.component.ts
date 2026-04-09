import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { CategoryClient } from '../../../../core/clients/category/category.client';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICategoryResponse,
  ICreateCategoryRequest,
} from '../../../../core/clients/category/models/category-client.model';
import { form, FormField, required } from '@angular/forms/signals';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { ICreateProductRequest } from '../../../../core/clients/product/models/product-client.model';
import { AnyfoodInputComponent, AnyfoodSelectionComponent } from '@anyfood/ui';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-editor.component',
  imports: [AnyfoodInputComponent, FormField, AnyfoodSelectionComponent],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditorComponent {
  categoryClient = inject(CategoryClient);
  productClient = inject(ProductClient);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  $productFormModel = signal<ICreateProductRequest>({
    name: '',
    calories: null,
    carbs: 0,
    categoryId: 0,
    fat: 0,
    glycemicIndex: 0,
    imageUrl: '',
    price: 0,
    protein: 0,
  });

  $categories = toSignal(this.categoryClient.getAll(), {
    initialValue: [] as ICategoryResponse[]
  });

  productForm = form(this.$productFormModel, (path) => {
    required(path.categoryId);
    required(path.name);
    required(path.calories);
  });

  createProduct() {
    const formValue = this.productForm().value();
    this.productClient.create(formValue).subscribe((response) => {
      this.router.navigate(['../details', response.id], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
