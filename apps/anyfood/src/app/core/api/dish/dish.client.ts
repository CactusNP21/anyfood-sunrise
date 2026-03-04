import { inject, Injectable } from '@angular/core';
import { SERVER_URL } from '../../constant/server.constant';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { ABaseRestClient } from '../../models/base-rest-client.model';
import { IDish, IDishCreateRequest, } from '../../models/dish.model';

@Injectable({
  providedIn: 'root',
})
export class DishClient extends ABaseRestClient<IDish, IDishCreateRequest> {
  route = 'dish';
}
