import { inject, Injectable } from '@angular/core';
import { ProductClient } from '../clients/product/product.client';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private productsClient = inject(ProductClient);

  $allProducts = toSignal(this.productsClient.getAll(), { initialValue: [] });
}
