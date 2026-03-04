import { ABaseRestClient } from '../../models/base-rest-client.model';
import { Injectable } from '@angular/core';
import { IProduct, IProductCreateRequest } from '../../models/product.model';
@Injectable(
  {providedIn: 'root'}
)
export class ProductsClient extends ABaseRestClient<IProduct, IProductCreateRequest> {
  route = 'products';
}
