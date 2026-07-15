import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { ButtonDirective } from '../../../../../../../shared/directives/button.directive';
import {
  AnyfoodImageComponent,
  AnyfoodInputComponent,
  AnyfoodSelectionComponent,
} from '@anyfood/ui';
import { ProductsService } from '../../../../../../../core/services/products.service';
import { ProductSelectionComponent } from '../../../../../../../shared/features/product-selection/product-selection.component';
import { IProduct } from '../../../../../../../core/entities/product/product.entity';
import { form, FormField } from '@angular/forms/signals';
import { IRecipe } from '../../../../../../../core/entities/recipe/recipe.entity';
import {
  RecipeSelectionComponent
} from '../../../../../../../shared/features/recipe-selection/recipe-selection.component';

export interface IDayPlanEntryFormModel {
  products: (IProduct & {
    weight: number;
    time: number;
  })[];
  recipes: (IRecipe & {
    weight: number;
    time: number;
  })[];
}

@Component({
  selector: 'add-day-plan-entry-picker',
  imports: [
    ButtonDirective,
    AnyfoodSelectionComponent,
    ProductSelectionComponent,
    FormField,
    AnyfoodImageComponent,
    AnyfoodInputComponent,
    RecipeSelectionComponent,
  ],
  templateUrl: 'day-plan-entry-picker.component.html',
})
export class DayPlanEntryPickerComponent {
  $time = input.required<number>({ alias: 'time' });

  confirmed = output<IDayPlanEntryFormModel>();

  $popover = viewChild.required<ElementRef<HTMLElement>>('addEntryPopover');

  $selectedProducts = form(signal<IProduct[]>([]));
  $selectedRecipes = form(signal<IRecipe[]>([]));

  $formModel = signal<IDayPlanEntryFormModel>({
    products: [],
    recipes: [],
  });

  entryForm = form(this.$formModel);

  $pickerTab = signal<'recipes' | 'products'>('recipes');

  constructor() {
    effect(() => {
      const time = untracked(() => this.$time());
      const selected = this.$selectedProducts().value();
      const newIds = new Set(selected.map((p) => p.id));
      this.entryForm.products().value.update((current) => {
        const currentIds = new Set(current.map((v) => v.id));
        const added = selected.filter((p) => !currentIds.has(p.id));
        const removed = [...currentIds].filter((id) => !newIds.has(id));
        const afterRemove = current.filter((p) => !removed.includes(p.id));
        return [
          ...afterRemove,
          ...added.map((p) => ({ ...p, weight: 0, time })),
        ];
      });
    });

    effect(() => {
      const time = untracked(() => this.$time());
      const selected = this.$selectedRecipes().value();
      const newIds = new Set(selected.map((p) => p.id));
      this.entryForm.recipes().value.update((current) => {
        const currentIds = new Set(current.map((v) => v.id));
        const added = selected.filter((p) => !currentIds.has(p.id));
        const removed = [...currentIds].filter((id) => !newIds.has(id));
        const afterRemove = current.filter((p) => !removed.includes(p.id));
        return [
          ...afterRemove,
          ...added.map((p) => ({ ...p, weight: 0, time })),
        ];
      });
    });
  }

  weightProductFieldAt(index: number) {
    return this.entryForm.products[index].weight;
  }

  weightRecipeFieldAt(index: number) {
    return this.entryForm.recipes[index].weight;
  }

  removeProduct(product: IProduct) {
    this.$selectedProducts().value.update((current) =>
      current.filter((p) => p.id !== product.id),
    );
  }

  removeRecipe(product: IRecipe) {
    this.$selectedRecipes().value.update((current) =>
      current.filter((p) => p.id !== product.id),
    );
  }

  // Підтвердження — емітимо результат і закриваємо popover
  onConfirm() {
    this.confirmed.emit(this.entryForm().value());
    this.close();
  }

  // Просто закрити без підтвердження
  onCancel() {
    this.close();
  }

  private close() {
    this.$popover().nativeElement.hidePopover();
  }
}
