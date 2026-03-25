import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ICreateProductRequest,
  IUpdateProductRequest,
} from './models/product-client.model';
import { IProduct } from '../../entities/product/product.entity';

@Injectable({ providedIn: 'root' })
export class ProductClient {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/products';

  getById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.base}/${id}`);
  }

  getSystemProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.base}/system`);
  }

  getMyProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.base}/my`);
  }

  create(body: ICreateProductRequest): Observable<IProduct> {
    return this.http.post<IProduct>(this.base, body);
  }

  update(id: number, body: IUpdateProductRequest): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.base}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
