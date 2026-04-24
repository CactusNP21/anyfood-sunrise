import { Component, inject, signal, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IDish } from '../../core/models/dish.model';
import { DishListService } from '../../core/services/dish-list.service';
import { DishComponent } from '../../shared/dish/dish.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DishComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dishListService = inject(DishListService);

  $dishes: Signal<IDish[] | undefined> = signal([]);

  addDishToList(dish: IDish) {
    this.dishListService.addDish(dish);
  }
}
