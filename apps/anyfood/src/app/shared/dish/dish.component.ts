import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IDish } from '../../core/models/dish.model';

@Component({
  selector: 'app-dish',
  imports: [NgOptimizedImage],
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DishComponent {
  $dish = input.required<IDish>({alias: 'dish'});


}
