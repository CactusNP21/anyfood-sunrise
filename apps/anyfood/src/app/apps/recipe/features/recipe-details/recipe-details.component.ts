import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { RecipeClient } from '../../../../core/clients/recipe/recipe.client';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from '../../../../core/entities/recipe/recipe.entity';
import { AnyfoodImageComponent } from '@anyfood/ui';

@Component({
  selector: 'app-recipe-details',
  imports: [AnyfoodImageComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnInit {
  recipeClient = inject(RecipeClient);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  $recipe = signal<IRecipe | null>(null);

  ngOnInit() {
    const recipeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!recipeId) return;

    this.recipeClient.getById(recipeId).subscribe((recipe) => {
      this.$recipe.set(recipe);
    });
  }
}
