import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IProduct } from '../../core/models/product.model';

@Component({
  selector: 'app-product',
  imports: [NgOptimizedImage],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  $product = input.required<IProduct>({alias: 'product'});
}
