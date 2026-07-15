import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductClient } from '../../../../core/clients/product/product.client';
import { IProduct } from '../../../../core/entities/product/product.entity';
import { AnyfoodImageComponent } from '@anyfood/ui';
import { AuthFacade } from '../../../auth/data-access/facades/auth.facade';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DetailsTopBarComponent } from '../../../../shared/features/details-top-bar/details-top-bar.component';

@Component({
  selector: 'app-product-details',
  imports: [
    AnyfoodImageComponent,
    ButtonDirective,
    DatePipe,
    DecimalPipe,
    RouterLink,
    DetailsTopBarComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  private readonly client = inject(ProductClient);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly $productDetails = signal<IProduct | null>(null);
  readonly $productId = signal<string>('');

  // Price modal
  readonly $isPriceModalOpen = signal(false);
  readonly $newPrice = signal<number>(0);
  readonly $isPriceUpdating = signal(false);

  readonly $macroTotal = computed(() => {
    const p = this.$productDetails();
    if (!p) return 0;
    return (p.protein ?? 0) + (p.fat ?? 0) + (p.carbs ?? 0);
  });

  readonly $proteinPct = computed(() => {
    const total = this.$macroTotal();
    if (!total) return 0;
    return Math.round(((this.$productDetails()?.protein ?? 0) / total) * 100);
  });

  readonly $fatPct = computed(() => {
    const total = this.$macroTotal();
    if (!total) return 0;
    return Math.round(((this.$productDetails()?.fat ?? 0) / total) * 100);
  });

  readonly $carbsPct = computed(() => {
    const total = this.$macroTotal();
    if (!total) return 0;
    return Math.round(((this.$productDetails()?.carbs ?? 0) / total) * 100);
  });

  constructor() {
    effect(() => {
      const id = this.$productId();
      if (!id) return;
      this.client.getById(id).subscribe((p) => {
        this.$productDetails.set(p);
        this.$newPrice.set(p.price);
      });
    });
  }

  ngOnInit() {
    this.$productId.set(this.activatedRoute.snapshot.params['id']);
  }

  openPriceModal() {
    const product = this.$productDetails();
    if (!product) return;
    this.$newPrice.set(product.price);
    this.$isPriceModalOpen.set(true);
  }

  closePriceModal() {
    this.$isPriceModalOpen.set(false);
  }

  submitPrice() {
    const id = this.$productDetails()?.id;
    if (!id) return;

    this.$isPriceUpdating.set(true);
    this.client.updatePrice(id, this.$newPrice()).subscribe({
      next: (updated) => {
        this.$productDetails.set(updated);
        this.$isPriceModalOpen.set(false);
        this.$isPriceUpdating.set(false);
      },
      error: () => this.$isPriceUpdating.set(false),
    });
  }

  editProduct() {
    const product = this.$productDetails();
    if (!product) return;
    this.router.navigate(['/products/edit', product.id]);
  }

  deleteProduct() {
    const id = this.$productDetails()?.id;
    if (!id) return;
    this.client.delete(id).subscribe(() =>
      this.router.navigate(['../../list'], {
        relativeTo: this.activatedRoute,
      }),
    );
  }
}
