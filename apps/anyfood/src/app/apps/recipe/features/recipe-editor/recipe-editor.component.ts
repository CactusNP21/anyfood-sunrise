import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { AnyfoodInputComponent, AnyfoodSelectionComponent } from '@anyfood/ui';
import { ICreateRecipeRequest } from '../../../../core/clients/recipe/models/recipe-client.model';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { IProduct } from '../../../../core/entities/product/product.entity';
import { NgOptimizedImage } from '@angular/common';
import { RecipeClient } from '../../../../core/clients/recipe/recipe.client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-editor',
  imports: [
    AnyfoodInputComponent,
    FormField,
    AnyfoodSelectionComponent,
    NgOptimizedImage,
  ],
  templateUrl: './recipe-editor.component.html',
  styleUrl: './recipe-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeEditorComponent implements OnInit {
  productClient = inject(ProductClient);
  recipeClient = inject(RecipeClient);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  $formModel = signal<ICreateRecipeRequest>({
    description: '',
    duration: 0,
    imageUrl: '',
    name: '',
    portions: 0,
    recipeProducts: [],
    recipeCategories: [],
  });

  constructor() {
    effect(() => {
      const selectedProducts = this.selectedProducts().value();
      const newIds = new Set(selectedProducts.map((p) => p.id));

      this.recipeForm.recipeProducts().value.update((currentProducts) => {
        const currentProductsSet = new Set(
          currentProducts.map((v) => v.productId),
        );
        const added = selectedProducts.filter(
          (p) => !currentProductsSet.has(p.id),
        );
        const removed = [...currentProductsSet].filter((id) => !newIds.has(id));

        const afterRemove = currentProducts.filter(
          (p) => !removed.includes(p.productId),
        );

        return [
          ...afterRemove,
          ...added.map((p) => ({ productId: p.id, weight: 0 })),
        ];
      });
    });
  }

  selectedProducts = form<IProduct[]>(signal<IProduct[]>([]));

  $products = signal<IProduct[]>([]);

  ngOnInit() {
    this.productClient.getAll().subscribe((products) => {
      this.$products.set(products);
    });
  }

  recipeForm = form(this.$formModel);

  createRecipe() {
    const recipe = this.recipeForm().value();
    this.recipeClient.createRecipe(recipe).subscribe((recipe) => {
      this.router.navigate(['../details', recipe.id], {relativeTo: this.activatedRoute});
    })
  }

}
