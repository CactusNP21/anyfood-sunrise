import { Component, effect, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AnyfoodInputComponent, AnyfoodSelectionComponent } from '@anyfood/ui';
import { form, FormField, minLength, required } from '@angular/forms/signals';
import { firstValueFrom, map } from 'rxjs';
import { DishClient } from '../../../core/api/dish/dish.client';
import {
  IDish,
  IDishCreateRequest,
  IDishFormModel,
} from '../../../core/models/dish.model';
import { IIngredient } from '../../../core/models/ingredient.model';
import { ProductsClient } from '../../../core/api/products/products.client';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'dish-constructor',
  templateUrl: 'dish-constructor.component.html',
  imports: [
    ReactiveFormsModule,
    AnyfoodInputComponent,
    AnyfoodSelectionComponent,
    FormField,
    NgOptimizedImage,
  ],
})
export class DishConstructorComponent {
  fb = inject(NonNullableFormBuilder);
  productClient = inject(ProductsClient);
  dishClient = inject(DishClient);

  $formModel = signal<IDishFormModel>({
    name: '',
    description: '',
    imageUrl: '',
    products: [],
  });

  dishForm = form(this.$formModel, (dishForm) => {
    required(dishForm.name);
    minLength(dishForm.products, 1);
  });

  submitForm() {
    const formValue = this.dishForm().value();
    const dishIngredient: IDishCreateRequest['ingredients'] =
      formValue.products.map((product) => {
        return {
          productId: product.id,
          weight: product.weight,
        };
      });
    this.dishClient
      .createEntity({ ...formValue, ingredients: dishIngredient })
      .subscribe();
  }

  deleteProduct(productToDelete: IDishFormModel['products'][0]) {
    this.$formModel.update((model) => ({
      ...model,
      products: model.products.filter(
        (product) => product.id !== productToDelete.id
      ),
    }));
  }

  ingredientsSearch = (input: string) => {
    return firstValueFrom(
      this.productClient
        .getAllEntities()
        .pipe(
          map((products) =>
            products.map((product) => ({ ...product, weight: '0' }))
          )
        )
    );
  };
}
