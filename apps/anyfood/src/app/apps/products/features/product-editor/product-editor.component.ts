import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
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
  selector: 'app-product-editor',
  imports: [AnyfoodInputComponent, FormField, AnyfoodSelectionComponent],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditorComponent implements OnInit {
  categoryClient = inject(CategoryClient);
  productClient = inject(ProductClient);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  $productFormModel = signal<ICreateProductRequest>({
    name: '',
    carbs: 0,
    categoryId: 0,
    fat: 0,
    glycemicIndex: 0,
    imageUrl: '',
    price: 0,
    protein: 0,
  });

  $categories = toSignal(this.categoryClient.getAll(), {
    initialValue: [] as ICategoryResponse[],
  });

  $id = signal<string | null>(null);
  $hasId = computed(() => {
    const id = this.$id();
    return Boolean(id && !isNaN(+id));
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.idExists(id)) return;

    this.$id.set(id);
    this.productClient.getById(id).subscribe((product) => {
      this.$productFormModel.set(product);
    });
  }

  private idExists(id: unknown): id is string {
    return typeof id === 'string' && !!id;
  }

  productForm = form(this.$productFormModel, (path) => {
    required(path.categoryId);
    required(path.name);
  });

  createProduct() {
    const formValue = this.productForm().value();
    this.productClient.create(formValue).subscribe((response) => {
      this.router.navigate(['../details', response.id], {
        relativeTo: this.activatedRoute,
      });
    });
  }

  editProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.idExists(id)) return;

    const formValue = this.productForm().value();
    this.productClient.update(id, formValue).subscribe((response) => {
      this.router.navigate(['../details', response.id], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
