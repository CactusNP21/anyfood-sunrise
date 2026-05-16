import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';

export interface IGenerateShoppingListRequest {
  name:string;
  recipes:
    {recipeVersionId: number; weight: number}[];
}

interface IShoppingList {
  id: number;
  productName: string;
  imageUrl: string;
  totalWeight: number;
  pricePerKg: number;
  totalPrice: number;
  isPurchased: boolean;
}

export interface IMyShoppingList {
  id: number;
  name: string;
  createdAt: string;
  items: IShoppingList[];
  totalPrice: number;
}

@Injectable({ providedIn: 'root' })
export class ShoppingListClient {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/shopping-lists`;

  generate(request: IGenerateShoppingListRequest) {
    return this.http.post<IShoppingList[]>(`${this.base}/generate`, request);
  }

  getMy() {
    return this.http.get<IMyShoppingList[]>(`${this.base}`);
  }
}
