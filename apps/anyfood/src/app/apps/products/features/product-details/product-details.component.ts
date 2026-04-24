import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { IProduct } from '../../../../core/entities/product/product.entity';
import { NgOptimizedImage } from '@angular/common';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { AnyfoodImageComponent } from '@anyfood/ui';

@Component({
  selector: 'app-product-details',
  imports: [
    NgOptimizedImage,
    ButtonDirective,
    AnyfoodImageComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  client = inject(ProductClient);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  $categoryId = signal('');
  $productDetails = signal<IProduct | null>(null);

  deleteProduct() {
    const categoryId = +this.$categoryId();
    if (isNaN(categoryId)) return;
    this.client.delete(categoryId).subscribe(() => {
      this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    });
  }

  editProduct() {
    const productDetails = this.$productDetails();
    if (!productDetails) return;

    this.router.navigate(['/products/edit', productDetails.id]);
  }

  constructor() {
    effect(() => {
      const productId = this.$categoryId();
      if (!productId) return;

      this.client.getById(productId).subscribe((category) => {
        this.$productDetails.set(category);
      });
    });
  }

  ngOnInit() {
    this.$categoryId.set(this.activatedRoute.snapshot.params['id']);
  }
}
