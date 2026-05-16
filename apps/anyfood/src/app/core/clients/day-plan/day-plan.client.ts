import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { ICreateDayPlanRequest } from './models/day-plan-client.model';
import { IRecipe } from '../../entities/recipe/recipe.entity';

@Injectable({
  providedIn: 'root',
})
export class DayPlanClient {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/day-plan`;

  getMyDayPlans() {
    return this.http.get<{name: string}[]>(`${this.base}/my`);
  }

  create(request: ICreateDayPlanRequest) {
    return this.http.post<unknown>(`${this.base}`, request);
  }
}
