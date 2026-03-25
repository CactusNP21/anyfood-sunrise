import { Component, inject, resource, signal, Signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import { DishClient } from '../../core/api/dish/dish.client';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { IDish } from '../../core/models/dish.model';
import { NgOptimizedImage } from '@angular/common';
import { DishListService } from '../../core/services/dish-list.service';
import { DishComponent } from '../../shared/dish/dish.component';
import { sign } from 'node:crypto';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DishComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dishClient = inject(DishClient);
  dishListService = inject(DishListService);

  $dishes: Signal<IDish[] | undefined> = signal([])

  addDishToList(dish: IDish) {
    this.dishListService.addDish(dish);
  }
}
