import { Component, inject, model } from '@angular/core';
import { AnyfoodSelectionComponent } from '@anyfood/ui';
import { FormValueControl } from '@angular/forms/signals';
import { IRecipe } from '../../../core/entities/recipe/recipe.entity';
import { RecipeService } from '../../../core/services/recipe.service';

@Component({
  selector: 'app-recipe-selection',
  imports: [AnyfoodSelectionComponent],
  template: `
    <anyfood-selection
      [inputID]="$id()"
      [(value)]="value"
      label="Рецепти"
      [options]="recipeService.$allRecipes()"
      [primaryKey]="'id'"
      [displayKey]="'name'"
      [imgKey]="'imageUrl'"
      placeholder="Пошук продукту..."
    />
  `,
})
export class RecipeSelectionComponent implements FormValueControl<IRecipe[]> {
  $id = model.required<string>({ alias: 'id' });

  recipeService = inject(RecipeService);

  value = model.required<IRecipe[]>();
}
