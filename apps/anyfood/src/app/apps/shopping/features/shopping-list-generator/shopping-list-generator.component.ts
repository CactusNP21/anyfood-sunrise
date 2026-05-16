import { Component, effect, inject, signal } from '@angular/core';
import { AnyfoodInputComponent, AnyfoodSelectionComponent } from '@anyfood/ui';
import {
  IGenerateShoppingListRequest,
  ShoppingListClient,
} from '../../../../core/clients/shopping-list/shopping-list.client';
import { form, FormField } from '@angular/forms/signals';
import { IRecipe } from '../../../../core/entities/recipe/recipe.entity';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeClient } from '../../../../core/clients/recipe/recipe.client';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'shopping-list-generator',
  template: `
    <div>
      <anyfood-input [formField]="shoppingListForm.name" label="Name" inputID="shopping-list-name" />
      <anyfood-selection
        [displayKey]="'name'"
        [primaryKey]="'id'"
        [imgKey]="'imageUrl'"
        [options]="$recipes()"
        inputID="day-plan-products"
        label="Products"
        [formField]="selectedRecipes"
      />
      <div>
        @for (
          entry of selectedRecipes().value();
          track entry;
          let index = $index
        ) {
          <div class="flex gap-2 flex-col justify-between">
            <img
              width="120"
              height="120"
              [ngSrc]="entry.imageUrl"
              alt="title image"
            />
            <span>{{ entry.name }}</span>
            <anyfood-input
              type="number"
              label="Вага"
              [inputID]="'weight' + entry.id"
              [formField]="shoppingListForm.recipes[index].weight"
            />
            <button type="button">X</button>
          </div>
        }
      </div>
      <button type="button" (click)="generateShoppingList()">
        Generate list
      </button>
    </div>
  `,
  imports: [
    AnyfoodInputComponent,
    AnyfoodSelectionComponent,
    FormField,
    NgOptimizedImage,
  ],
})
export class ShoppingListGeneratorComponent {
  recipeClient = inject(RecipeClient);
  shoppingListClient = inject(ShoppingListClient);

  $formModel = signal<IGenerateShoppingListRequest>({
    name: '',
    recipes: [],
  });

  $recipes = toSignal(this.recipeClient.getAll(), { initialValue: [] });

  selectedRecipes = form(signal<IRecipe[]>([]));

  shoppingListForm = form(this.$formModel);

  constructor() {
    effect(() => {
      const selectedRecipes = this.selectedRecipes().value();
      const newIds = new Set(selectedRecipes.map((p) => p.latestVersionId));

      this.shoppingListForm.recipes().value.update((currentRecipes) => {
        const currentRecipeVersions = new Set(
          currentRecipes.map((v) => v.recipeVersionId),
        );
        const added = selectedRecipes.filter(
          (p) => !currentRecipeVersions.has(p.latestVersionId),
        );
        const removed = [...currentRecipeVersions].filter(
          (id) => !newIds.has(id),
        );

        const afterRemove = currentRecipes.filter(
          (p) => !removed.includes(p.recipeVersionId),
        );

        return [
          ...afterRemove,
          ...added.map((p) => ({ recipeVersionId: p.latestVersionId, weight: 0 })),
        ];
      });
    });
  }

  generateShoppingList() {
    this.shoppingListClient.generate(this.shoppingListForm().value()).subscribe((r) => {
      console.log(r);
    });
  };
}
