import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProduct } from '../../../core/entities/product/product.entity';
import { ProductConstructorFacade } from './data-access/facades/product-constructor.facade';
import { ICreateProductRequest } from '../../../core/clients/product/models/product-client.model';
import {
  form,
  FormField,
  maxLength,
  min,
  minLength,
  required,
  schema,
} from '@angular/forms/signals';
import { TConvertNumberToString } from '../../../shared/utils/convert-type-to-type.util';

@Component({
  selector: 'app-product-constructor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FormField],
  templateUrl: './product-constructor.component.html',
})
export class ProductConstructorComponent implements OnInit, OnDestroy {
  // ── Inputs / Outputs ───────────────────────────────────────────────────────
  readonly $product = input<IProduct | null>(null, { alias: 'product' });
  readonly $isAdmin = input<boolean>(false, { alias: 'isAdmin' });

  readonly saved = output<IProduct>();
  readonly cancelled = output<void>();

  // ── Dependencies ──────────────────────────────────────────────────────────
  readonly facade = inject(ProductConstructorFacade);
  private readonly fb = inject(FormBuilder);

  // ── Computed ──────────────────────────────────────────────────────────────
  readonly $isEditMode = computed(() => this.$product() !== null);

  readonly $imagePreview = computed(() => {
    const url = this.createProductForm.imageUrl().value();
    return typeof url === 'string' && url.startsWith('http') ? url : null;
  });

  $formModel = signal<TConvertNumberToString<ICreateProductRequest>>({
    calories: '',
    carbs: '',
    categoryId: '',
    fat: '',
    glycemicIndex: '',
    imageUrl: '',
    isSystem: false,
    name: '',
    price: '',
    protein: '',
  });

  createProductFormSchema = schema<
    TConvertNumberToString<ICreateProductRequest>
  >((path) => {
    required(path.name);
    minLength(path.name, 2);
    maxLength(path.name, 200);

    required(path.categoryId);

    required(path.calories);
    min(path.calories, 0);

    required(path.protein);
    min(path.price, 0);

    required(path.fat);
    min(path.fat, 0);

    required(path.carbs);
    min(path.carbs, 0);

    min(path.glycemicIndex, 0);

    required(path.price);
    min(path.price, 0.01);
  });

  createProductForm = form(this.$formModel, this.createProductFormSchema);

  readonly nutritionFields = [
    {
      key: 'calories',
      label: 'Calories',
      unit: 'kcal',
      placeholder: '0',
      color: '#f97316',
    },
    {
      key: 'protein',
      label: 'Protein',
      unit: 'g',
      placeholder: '0.0',
      color: '#22c55e',
    },
    {
      key: 'fat',
      label: 'Fat',
      unit: 'g',
      placeholder: '0.0',
      color: '#eab308',
    },
    {
      key: 'carbs',
      label: 'Carbs',
      unit: 'g',
      placeholder: '0.0',
      color: '#3b82f6',
    },
  ] as const;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  constructor() {
    effect(() => {
      const p = this.$product();
      if (p) this.patchForm(p);
    });

    effect(() => {
      const saved = this.facade.$savedProduct();
      if (saved) {
        this.saved.emit(saved);
        this.facade.resetState();
      }
    });
  }

  ngOnInit(): void {
    this.facade.loadCategories();
  }

  ngOnDestroy(): void {
    this.facade.resetState();
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  onSubmit(): void {
    if (this.createProductForm().invalid()) {
      this.createProductForm().markAsTouched();
      return;
    }

    const product = this.$product();

    if (product) {
      const { isSystem, ...updatePayload } = this.buildPayload();
      this.facade.update(product.id, updatePayload);
    } else {
      this.facade.create(this.buildPayload());
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  toggleIsSystem(): void {
    const ctrl = this.createProductForm.isSystem();
    // ctrl?.setControlValue(!ctrl.value());
  }

  isInvalid(field: keyof ICreateProductRequest): boolean {
    const ctrl = this.createProductForm[field];
    return !!(ctrl?.().invalid() && ctrl?.().touched());
  }

  // ── Private ────────────────────────────────────────────────────────────────

  private buildPayload(): ICreateProductRequest {
    const v = this.createProductForm().value();
    return {
      name: v.name,
      categoryId: +v.categoryId,
      calories: +v.calories,
      protein: +v.protein,
      fat: +v.fat,
      carbs: +v.carbs,
      glycemicIndex: v.glycemicIndex !== null ? +v.glycemicIndex : 0,
      imageUrl: v.imageUrl,
      price: +v.price,
      isSystem: v.isSystem,
    };
  }

  private patchForm(p: IProduct): void {
    // this.createProductForm().setControlValue({
    //   name: p.name,
    //   categoryId: p.categoryId.toString(),
    //   calories: p.calories.toString(),
    //   protein: p.protein.toString(),
    //   fat: p.fat.toString(),
    //   carbs: p.carbs.toString(),
    //   glycemicIndex: p.glycemicIndex.toString(),
    //   imageUrl: p.imageUrl,
    //   price: p.price.toString(),
    //   isSystem: p.isSystem,
    // });
  }
}
