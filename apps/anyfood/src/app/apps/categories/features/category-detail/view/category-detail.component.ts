import {
  ChangeDetectionStrategy,
  Component, effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { CategoryClient } from '../../../../../core/clients/category/category.client';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ICategoryResponse } from '../../../../../core/clients/category/models/category-client.model';

@Component({
  selector: 'app-category-detail',
  imports: [],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryDetailComponent {
  client = inject(CategoryClient);
  activatedRoute = inject(ActivatedRoute);

  $categoryId = signal('');
  $categoryDetails = signal<ICategoryResponse | null>(null);

  constructor() {
    effect(() => {
      const categoryId = +this.$categoryId();
      if (isNaN(categoryId)) return;

      this.client.getById(categoryId).subscribe(category => {
        this.$categoryDetails.set(category)
      })
    });
  }

  ngOnInit() {
    this.$categoryId.set(this.activatedRoute.snapshot.params['id']);
  }

}
