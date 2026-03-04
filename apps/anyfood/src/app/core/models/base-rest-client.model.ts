import { Observable } from 'rxjs';
import { SERVER_URL } from '../constant/server.constant';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IBaseRestClient<TEntityResponse, TEntityRequest> {
  createEntity(entity: TEntityRequest): Observable<TEntityResponse>;

  getAllEntities(): Observable<TEntityResponse[]>;
  getEntityById(id: string): Observable<TEntityResponse>;
  deleteEntity(id: string): Observable<void>;
  updateEntity(id: string, entity: TEntityResponse): Observable<TEntityResponse>;
}

export abstract class ABaseRestClient<TResponse, TRequest>
  implements IBaseRestClient<TResponse, TRequest>
{
  protected http = inject(HttpClient);

  abstract route: string;

  get serverRoute() {
    return `${SERVER_URL}/${this.route}`;
  }

  createEntity(entity: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(this.serverRoute, entity);
  }

  deleteEntity(id: string): Observable<void> {
    return this.http.delete<void>(`${this.serverRoute}/${id}`);
  }

  getAllEntities(): Observable<TResponse[]> {
    return this.http.get<TResponse[]>(this.serverRoute);
  }

  getEntityById(id: string): Observable<TResponse> {
    return this.http.get<TResponse>(`${this.serverRoute}/${id}`);
  }

  updateEntity(id: string, entity: TResponse): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.serverRoute}/${id}`, entity);
  }
}
