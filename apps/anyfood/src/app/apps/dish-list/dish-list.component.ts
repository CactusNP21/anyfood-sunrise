import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DishListService } from '../../core/services/dish-list.service';
import { DishComponent } from '../../shared/dish/dish.component';

@Component({
  selector: 'app-dish-list',
  imports: [DishComponent],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishListComponent {
  dishListService = inject(DishListService);

  dishes = this.dishListService.getDishes();
}
