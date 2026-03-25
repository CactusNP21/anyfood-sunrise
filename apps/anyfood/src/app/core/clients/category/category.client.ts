import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../entities/category/category.entity';

@Injectable({ providedIn: 'root' })
export class CategoryClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/categories';

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.base);
  }

}
