// apps/anyfood/src/app/core/clients/recipe/recipe.client.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import {
  ICreateRecipeRequest,
  IUpdateRecipeRequest,
} from './models/recipe-client.model';
import { IRecipe } from '../../entities/recipe/recipe.entity';
import { Observable } from 'rxjs';
import { IProduct } from '../../entities/product/product.entity';

@Injectable({ providedIn: 'root' })
export class RecipeClient {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/recipe`;

  getAll() {
    return this.http.get<IRecipe[]>(`${this.base}`);
  }

  getById(id: string) {
    return this.http.get<IRecipe>(`${this.base}/${id}`);
  }

  createRecipe(recipe: ICreateRecipeRequest) {
    return this.http.post<IRecipe>(`${this.base}`, recipe);
  }

  updateRecipe(id: string, recipe: IUpdateRecipeRequest) {
    return this.http.put<IRecipe>(`${this.base}/${id}`, recipe);
  }

  deleteRecipe(id: string) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  getByCategory(categoryIds: number[]): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.base}/filter`, {
      params: { categoryIds },
    });
  }
}
