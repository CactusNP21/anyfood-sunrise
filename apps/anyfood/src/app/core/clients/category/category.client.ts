import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../../entities/category/category.entity';
import {
  ICategoryResponse,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from './models/category-client.model';
import { environment } from '../../../../enviroments/enviroments';

@Injectable({ providedIn: 'root' })
export class CategoryClient {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/categories`;

  getAll(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(this.base);
  }

  getById(id: number) {
    return this.http.get<ICategoryResponse>(`${this.base}/${id}`);
  }

  create(body: ICreateCategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(this.base, body);
  }

  update(
    id: number,
    body: IUpdateCategoryRequest,
  ): Observable<ICategoryResponse> {
    return this.http.put<ICategoryResponse>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
