import { Component, inject, resource, Signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import { DishClient } from '../../core/api/dish/dish.client';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { IDish } from '../../core/models/dish.model';
import { NgOptimizedImage } from '@angular/common';
import { DishListService } from '../../core/services/dish-list.service';
import { DishComponent } from '../../shared/dish/dish.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgOptimizedImage, DishComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dishClient = inject(DishClient);
  dishListService = inject(DishListService);

  $dishes: Signal<IDish[] | undefined> = toSignal<IDish[]>(
    this.dishClient.getAllEntities()
  );

  addDishToList(dish: IDish) {
    this.dishListService.addDish(dish);
  }
}
