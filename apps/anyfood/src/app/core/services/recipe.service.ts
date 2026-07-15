import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipeClient } from '../clients/recipe/recipe.client';

@Injectable({ providedIn: 'root' })
export class  RecipeService {
  private recipeClient = inject(RecipeClient);

  $allRecipes = toSignal(this.recipeClient.getAll(), { initialValue: [] });
}
