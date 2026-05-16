import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { AnyfoodInputComponent, AnyfoodSelectionComponent } from '@anyfood/ui';
import {
  ICreateDayPlanRequest,
  IDayPlanProductEntry,
  IDayPlanRecipeEntry,
} from '../../../../../../core/clients/day-plan/models/day-plan-client.model';
import { form, FormField } from '@angular/forms/signals';
import { IProduct } from '../../../../../../core/entities/product/product.entity';
import { IRecipe } from '../../../../../../core/entities/recipe/recipe.entity';
import { RecipeClient } from '../../../../../../core/clients/recipe/recipe.client';
import { ProductClient } from '../../../../../../core/clients/product/product.client';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';
import { DayPlanClient } from '../../../../../../core/clients/day-plan/day-plan.client';

@Component({
  selector: 'app-day-plan-editor',
  templateUrl: './day-plan-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AnyfoodInputComponent,
    AnyfoodSelectionComponent,
    FormField,
    NgOptimizedImage,
  ],
})
export class DayPlanEditorComponent {
  recipeClient = inject(RecipeClient);
  productClient = inject(ProductClient);
  dayPlanClient = inject(DayPlanClient);

  $recipes = toSignal(this.recipeClient.getAll(), { initialValue: [] });
  $products = toSignal(this.productClient.getAll(), { initialValue: [] });

  $model = signal<ICreateDayPlanRequest>({
    name: '',
    entries: [],
  });

  dayPlanForm = form(this.$model);

  selectedProducts = form<IProduct[]>(signal<IProduct[]>([]));
  selectedRecipes = form<IRecipe[]>(signal<IRecipe[]>([]));

  constructor() {
    effect(() => {
      const selectedProducts = this.selectedProducts().value();
      const selectedRecipes = this.selectedRecipes().value();

      const selectedProductIds = new Set(selectedProducts.map((p) => p.id));
      const selectedRecipeIds = new Set(selectedRecipes.map((r) => r.id));

      this.dayPlanForm.entries().value.update((entries) => {
        // Split current entries by type
        const productEntries = entries.filter(
          (e): e is IDayPlanProductEntry => e.productId != null,
        );
        const recipeEntries = entries.filter(
          (e): e is IDayPlanRecipeEntry => e.recipeId != null,
        );

        // Sync product entries
        const syncedProducts = [
          ...productEntries.filter((e) =>
            selectedProductIds.has(e.productId),
          ), // keep still-selected
          ...selectedProducts
            .filter(
              (p) => !productEntries.some((e) => e.productId === p.id),
            ) // add new
            .map(
              (p): IDayPlanProductEntry => ({
                productId: p.id,
                weight: 0,
                imageUrl: p.imageUrl,
                name: p.name,
              }),
            ),
        ];

        // Sync recipe entries
        const syncedRecipes = [
          ...recipeEntries.filter((e) =>
            selectedRecipeIds.has(e.recipeId),
          ), // keep still-selected
          ...selectedRecipes
            .filter(
              (r) => !recipeEntries.some((e) => e.recipeId === r.id),
            ) // add new
            .map(
              (r): IDayPlanRecipeEntry => ({
                recipeId: r.id,
                weight: 0,
                imageUrl: r.imageUrl,
                name: r.name,
              }),
            ),
        ];

        return [...syncedProducts, ...syncedRecipes];
      });
    });
  }

  createDayPlan() {
    this.dayPlanClient.create(this.dayPlanForm().value()).subscribe((r) => {
      console.log(r);
    })
  }
}
