import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../../core/entities/product/product.entity';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { AnyfoodImageComponent } from '@anyfood/ui';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, ButtonDirective, AnyfoodImageComponent],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductList {
  productsClient = inject(ProductClient);

  $products = signal<IProduct[]>([]);

  ngOnInit() {
    this.productsClient.getAll().subscribe((response) => {
      this.$products.set(response);
    });
  }
}
