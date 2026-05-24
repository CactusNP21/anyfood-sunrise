import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { CategoryClient } from '../../../../../core/clients/category/category.client';
import { ProductClient } from '../../../../../core/clients/product/product.client';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategoryResponse } from '../../../../../core/clients/category/models/category-client.model';
import { IProduct } from '../../../../../core/entities/product/product.entity';
import { AnyfoodImageComponent } from '@anyfood/ui';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  imports: [AnyfoodImageComponent, DecimalPipe, RouterLink],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailComponent implements OnInit {
  private readonly categoryClient = inject(CategoryClient);
  private readonly productClient = inject(ProductClient);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly $categoryId = signal<number | null>(null);
  readonly $category = signal<ICategoryResponse | null>(null);
  readonly $products = signal<IProduct[]>([]);
  readonly $isLoading = signal(true);

  constructor() {
    effect(() => {
      const id = this.$categoryId();
      if (id === null || isNaN(id)) return;

      this.$isLoading.set(true);

      this.categoryClient.getById(id).subscribe((category) => {
        this.$category.set(category);
      });

      this.productClient.getByCategory([id]).subscribe((products) => {
        this.$products.set(products);
        this.$isLoading.set(false);
      });
    });
  }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.$categoryId.set(id);
  }
}
