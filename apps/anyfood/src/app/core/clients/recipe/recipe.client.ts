import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { ICreateRecipeRequest } from './models/recipe-client.model';
import { IRecipe } from '../../entities/recipe/recipe.entity';

@Injectable({ providedIn: 'root' })
export class RecipeClient {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/recipe`;

  getAll() {
    return this.http.get<IRecipe[]>(`${this.base}`);
  }

  createRecipe(recipe: ICreateRecipeRequest) {
    return this.http.post<IRecipe>(`${this.base}`, recipe)
  }

  getById(id: string) {
    return this.http.get<IRecipe>(`${this.base}/${id}`);
  }

}
