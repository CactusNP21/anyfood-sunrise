import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IDish } from '../models/dish.model';

@Injectable({ providedIn: 'root' })
export class DishListService {
  private platformId = inject(PLATFORM_ID);
  private dishMap: Map<IDish['id'], IDish>;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const dishListEntries = JSON.parse(
        localStorage.getItem('dishList') || 'null'
      );
      this.dishMap = new Map(dishListEntries);
    } else {
      this.dishMap = new Map();
    }
  }

  addDish(dish: IDish) {
    this.dishMap.set(dish.id, dish);
    this.updateLocalStorage();
  }

  removeDish(dish: IDish) {
    this.dishMap.delete(dish.id);
    this.updateLocalStorage();
  }

  getDishes() {
    return this.dishMap.values();
  }

  private updateLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        'dishList',
        JSON.stringify([...this.dishMap.entries()])
      );
    }
  }
}
