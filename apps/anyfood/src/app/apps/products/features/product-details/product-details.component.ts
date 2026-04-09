import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CategoryClient } from '../../../../core/clients/category/category.client';
import { ActivatedRoute } from '@angular/router';
import { ICategoryResponse } from '../../../../core/clients/category/models/category-client.model';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { IProduct } from '../../../../core/entities/product/product.entity';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [NgOptimizedImage],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  client = inject(ProductClient);
  activatedRoute = inject(ActivatedRoute);

  $categoryId = signal('');
  $productDetails = signal<IProduct | null>(null);

  constructor() {
    effect(() => {
      const categoryId = +this.$categoryId();
      if (isNaN(categoryId)) return;

      this.client.getById(categoryId).subscribe((category) => {
        this.$productDetails.set(category);
      });
    });
  }

  ngOnInit() {
    this.$categoryId.set(this.activatedRoute.snapshot.params['id']);
  }
}
