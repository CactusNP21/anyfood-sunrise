import { Component, inject, model } from '@angular/core';
import { AnyfoodSelectionComponent } from '@anyfood/ui';
import { FormValueControl } from '@angular/forms/signals';
import { ProductsService } from '../../../core/services/products.service';
import { IProduct } from '../../../core/entities/product/product.entity';

@Component({
  selector: 'app-product-selection',
  imports: [AnyfoodSelectionComponent],
  template: `
    <anyfood-selection
      [inputID]="$id()"
      [(value)]="value"
      label="Продукти"
      [options]="productsService.$allProducts()"
      [primaryKey]="'id'"
      [displayKey]="'name'"
      [imgKey]="'imageUrl'"
      placeholder="Пошук продукту..."
    />
  `,
})
export class ProductSelectionComponent implements FormValueControl<IProduct[]> {
  $id = model.required<string>({alias: 'id'});

  productsService = inject(ProductsService);

  value = model.required<IProduct[]>();
}
