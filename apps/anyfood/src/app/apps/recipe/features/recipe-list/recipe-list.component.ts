import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeClient } from '../../../../core/clients/recipe/recipe.client';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-recipe-list',
  imports: [RouterLink],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  recipeClient = inject(RecipeClient);
  $recipes = toSignal(this.recipeClient.getAll());
}
