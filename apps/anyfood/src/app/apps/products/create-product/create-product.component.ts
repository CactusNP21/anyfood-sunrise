import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { IProductCreateRequest } from '../../../core/models/product.model';
import { form, FormField } from '@angular/forms/signals';
import { AnyfoodInputComponent } from '@anyfood/ui';
import { ProductsClient } from '../../../core/api/products/products.client';

@Component({
  selector: 'app-create-product',
  imports: [AnyfoodInputComponent, FormField],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent {
  productClient = inject(ProductsClient);

  $formModel = signal<IProductCreateRequest>({
    carbs: '0',
    fats: '',
    imgUrl: '',
    name: '',
    protein: '',
  });

  productForm = form(this.$formModel);

  createProduct() {
    const formValue = this.productForm().value();

    this.productClient.createEntity(formValue).subscribe();
  }
}
