import { Injectable, inject, signal, computed } from '@angular/core';
import { ProductClient } from '../../../../../core/clients/product/product.client';
import { CategoryClient } from '../../../../../core/clients/category/category.client';
import { ICategory } from '../../../../../core/entities/category/category.entity';
import { IProduct } from '../../../../../core/entities/product/product.entity';
import {
  ICreateProductRequest,
  IUpdateProductRequest,
} from '../../../../../core/clients/product/models/product-client.model';

@Injectable({ providedIn: 'root' })
export class ProductConstructorService {
  private readonly productClient = inject(ProductClient);
  private readonly categoryClient = inject(CategoryClient);

  // ── State ──────────────────────────────────────────────────────────────────
  readonly $categories = signal<ICategory[]>([]);
  readonly $categoriesLoading = signal<boolean>(false);
  readonly $categoriesError = signal<string | null>(null);

  readonly $saving = signal<boolean>(false);
  readonly $saveError = signal<string | null>(null);
  readonly $savedProduct = signal<IProduct | null>(null);

  // ── Computed ───────────────────────────────────────────────────────────────
  readonly $hasCategories = computed(() => this.$categories().length > 0);

  // ── Actions ────────────────────────────────────────────────────────────────

  loadCategories(): void {
    if (this.$hasCategories()) return;

    this.$categoriesLoading.set(true);
    this.$categoriesError.set(null);

    this.categoryClient.getAll().subscribe({
      next: (categories) => {
        this.$categories.set(categories);
        this.$categoriesLoading.set(false);
      },
      error: (err) => {
        this.$categoriesError.set(
          err.error?.message ?? 'Failed to load categories.',
        );
        this.$categoriesLoading.set(false);
      },
    });
  }

  create(request: ICreateProductRequest): void {
    this.$saving.set(true);
    this.$saveError.set(null);
    this.$savedProduct.set(null);

    this.productClient.create(request).subscribe({
      next: (product) => {
        this.$savedProduct.set(product);
        this.$saving.set(false);
      },
      error: (err) => {
        this.$saveError.set(err.error?.message ?? 'Failed to create product.');
        this.$saving.set(false);
      },
    });
  }

  update(id: number, request: IUpdateProductRequest): void {
    this.$saving.set(true);
    this.$saveError.set(null);
    this.$savedProduct.set(null);

    this.productClient.update(id, request).subscribe({
      next: (product) => {
        this.$savedProduct.set(product);
        this.$saving.set(false);
      },
      error: (err) => {
        this.$saveError.set(err.error?.message ?? 'Failed to update product.');
        this.$saving.set(false);
      },
    });
  }

  resetSaveState(): void {
    this.$saving.set(false);
    this.$saveError.set(null);
    this.$savedProduct.set(null);
  }
}
