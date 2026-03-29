import { Component, inject, signal } from '@angular/core';
import { CategoryClient } from '../../../../../core/clients/category/category.client';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ICategoryResponse } from '../../../../../core/clients/category/models/category-client.model';

@Component({
  selector: 'app-categories-list',
  imports: [RouterLink],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css',
})
export class CategoriesListComponent {
  categoriesClient = inject(CategoryClient);

  $categories = signal<ICategoryResponse[]>([]);

  ngOnInit() {
    this.categoriesClient.getAll().subscribe((response) => {
      this.$categories.set(response);
    });
  }
}
