import { Injectable, inject, Signal } from '@angular/core';
import { ICategory } from '../../../../../core/entities/category/category.entity';
import { ProductConstructorService } from '../services/product-constructor.service';
import { IProduct } from '../../../../../core/entities/product/product.entity';
import {
  ICreateProductRequest,
  IUpdateProductRequest,
} from '../../../../../core/clients/product/models/product-client.model';

@Injectable({ providedIn: 'root' })
export class ProductConstructorFacade {
  private readonly service = inject(ProductConstructorService);

  // ── Exposed signals (read-only) ────────────────────────────────────────────
  readonly $categories: Signal<ICategory[]> =
    this.service.$categories.asReadonly();
  readonly $categoriesLoading: Signal<boolean> =
    this.service.$categoriesLoading.asReadonly();
  readonly $categoriesError: Signal<string | null> =
    this.service.$categoriesError.asReadonly();
  readonly $saving: Signal<boolean> = this.service.$saving.asReadonly();
  readonly $saveError: Signal<string | null> =
    this.service.$saveError.asReadonly();
  readonly $savedProduct: Signal<IProduct | null> =
    this.service.$savedProduct.asReadonly();

  // ── Actions ────────────────────────────────────────────────────────────────

  loadCategories(): void {
    this.service.loadCategories();
  }

  create(request: ICreateProductRequest): void {
    this.service.create(request);
  }

  update(id: number, request: IUpdateProductRequest): void {
    this.service.update(id, request);
  }

  resetState(): void {
    this.service.resetSaveState();
  }
}
