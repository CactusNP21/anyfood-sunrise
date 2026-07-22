import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CategoryClient } from '../../../../core/clients/category/category.client';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICategoryResponse } from '../../../../core/clients/category/models/category-client.model';
import { form, FormField, required } from '@angular/forms/signals';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { ICreateProductRequest } from '../../../../core/clients/product/models/product-client.model';
import {
  AnyfoodImageComponent,
  AnyfoodInputComponent,
  AnyfoodSelectionComponent,
} from '@anyfood/ui';
import { toSignal } from '@angular/core/rxjs-interop';
import { IProduct } from '../../../../core/entities/product/product.entity';

@Component({
  selector: 'app-product-editor',
  imports: [
    AnyfoodInputComponent,
    FormField,
    AnyfoodSelectionComponent,
    RouterLink,
    AnyfoodImageComponent,
  ],
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
    categories: [],
    parentProductId: null,
    fat: 0,
    imageUrl: '',
    price: 0,
    protein: 0,
  });

  $categories = toSignal(this.categoryClient.getAll(), {
    initialValue: [] as ICategoryResponse[],
  });

  $currentProduct = signal<IProduct | null>(null);

  $products = computed(() => {
    const products = this.productClient.getProductsSignal()();
    const currentProduct = this.$currentProduct();
    if (!currentProduct) return products;
    const parentProductIds = currentProduct.path.split('.').map((id) => Number(id));
    return products.filter((product) => product.id !== currentProduct.id || parentProductIds.includes(product.id));
  });

  $id = signal<string | null>(null);
  $hasId = computed(() => {
    const id = this.$id();
    return Boolean(id && !isNaN(+id));
  });

  $imagePreview = computed(() => {
    const url = this.productForm.imageUrl().value();
    return typeof url === 'string' && url.trim().length > 0 ? url : null;
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!this.idExists(id)) return;

    this.$id.set(id);
    this.productClient.getById(id).subscribe((product) => {
      this.$currentProduct.set(product);
      this.$productFormModel.set({
        name: product.name,
        carbs: product.carbs,
        categories: product.categories,
        fat: product.fat,
        imageUrl: product.imageUrl,
        price: product.price,
        protein: product.protein,
        parentProductId: product.parentProductId,
      });
    });
  }

  private idExists(id: unknown): id is string {
    return typeof id === 'string' && !!id;
  }

  productForm = form(this.$productFormModel, (path) => {
    required(path.name);
    required(path.categories);
  });

  createProduct() {
    const formValue = this.productForm().value();
    this.productClient.create(formValue).subscribe((response) => {
      this.productClient.reloadProducts();
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
      this.productClient.reloadProducts();
      this.router.navigate(['../details', response.id], {
        relativeTo: this.activatedRoute,
      });
    });
  }
}
