import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { ICreateDayPlanRequest } from './models/day-plan-client.model';
import { IRecipe } from '../../entities/recipe/recipe.entity';
import { IDayPlan } from '../../entities/day-plan.entity';

export interface IShortDayPlan {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DayPlanClient {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/day-plan`;

  private readonly myDayPlansResource = httpResource<IShortDayPlan[]>(
    () => `${this.base}/my`,
    { defaultValue: [] },
  );

  getDayPlanDetails(id: number) {
    return httpResource<IDayPlan>(() => `${this.base}/${id}`).asReadonly()
  }

  getMyDayPlansSignal() {
    return this.myDayPlansResource.asReadonly().value;
  }

  reloadMyDayPlans() {
    this.myDayPlansResource.reload();
  }

  create(request: ICreateDayPlanRequest) {
    return this.http.post<unknown>(`${this.base}`, request);
  }
}
