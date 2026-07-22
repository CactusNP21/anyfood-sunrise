import { Service } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroments';
import { IFridge } from '../../entities/fridge.entity';

@Service()
export class FridgeClient {
  private readonly base = `${environment.apiUrl}/fridge`;

  fridgeResource = httpResource<IFridge>(() => this.base).asReadonly();
}
