import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { DishListService } from '../../../core/services/dish-list.service';
import { ProductsClient } from '../../../core/api/products/products.client';
import { IProduct } from '../../../core/models/product.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [NgOptimizedImage],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private dishListService = inject(DishListService);
  private productsClient = inject(ProductsClient);

  private $allProducts = signal<IProduct[]>([]);

  ngOnInit() {
    this.productsClient.getAllEntities().subscribe((products) => {
      this.$allProducts.set(products);
    });
  }

  $products = computed(() => {
    const dishes = Array.from(this.dishListService.getDishes());
    const allProducts = this.$allProducts();
    const ingredientMap = new Map<number, { name: string; imgUrl: string; totalWeight: number; totalPrice: number }>();

    // Aggregate ingredients by productId
    dishes.forEach((dish) => {
      dish.ingredients.forEach((ingredient) => {
        const weight = parseFloat(ingredient.weight) || 0;
        const product = allProducts.find(p => p.id === ingredient.productId);

        if (ingredientMap.has(ingredient.productId)) {
          const existing = ingredientMap.get(ingredient.productId)!;
          existing.totalWeight += weight;
          existing.totalPrice += 0;
        } else {
          ingredientMap.set(ingredient.productId, {
            name: ingredient.name,
            imgUrl: product?.imgUrl || '',
            totalWeight: weight,
            totalPrice: 0,
          });
        }
      });
    });

    return Array.from(ingredientMap.values());
  });

  $totalPrice = computed(() => {
    return this.$products().reduce((total, product) => {
      return total + product.totalPrice;
    }, 0);
  });
}
