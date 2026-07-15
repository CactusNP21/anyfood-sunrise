import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { AnyfoodInputComponent } from '@anyfood/ui';
import {
  ICreateDayPlanRequest,
  IDayPlanEntry,
  IDayPlanProductEntry,
  IDayPlanRecipeEntry,
} from '../../../../../../core/clients/day-plan/models/day-plan-client.model';
import { form, FormField } from '@angular/forms/signals';
import { RecipeClient } from '../../../../../../core/clients/recipe/recipe.client';
import { ProductClient } from '../../../../../../core/clients/product/product.client';
import { toSignal } from '@angular/core/rxjs-interop';
import { DayPlanClient } from '../../../../../../core/clients/day-plan/day-plan.client';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '../../../../../../shared/directives/button.directive';
import {
  DayPlanEntryPickerComponent,
  IDayPlanEntryFormModel,
} from './features/day-plan-entry-picker.component';
import { IRecipe } from '../../../../../../core/entities/recipe/recipe.entity';
import { IProduct } from '../../../../../../core/entities/product/product.entity';
import { DecimalPipe } from '@angular/common';
import { MinutesToTimePipe } from './pipes/minutes-to-time.pipe';

interface PickerSelection {
  type: 'recipe' | 'product';
  id: string;
  weight: number;
}

@Component({
  selector: 'app-day-plan-editor',
  templateUrl: './day-plan-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AnyfoodInputComponent,
    FormField,
    RouterLink,
    ButtonDirective,
    DayPlanEntryPickerComponent,
    DecimalPipe,
    MinutesToTimePipe,
  ],
})
export class DayPlanEditorComponent {
  recipeClient = inject(RecipeClient);
  productClient = inject(ProductClient);
  dayPlanClient = inject(DayPlanClient);

  $recipes = toSignal(this.recipeClient.getAll(), { initialValue: [] });
  $products = toSignal(this.productClient.getAll(), { initialValue: [] });

  $model = signal<ICreateDayPlanRequest>({
    name: '',
    entries: [],
  });

  dayPlanForm = form(this.$model);

  $timeSlots = signal<{ time: number; entries: IDayPlanEntry[] }[]>([]);

  $totalNutrients = computed(() =>
    this.$timeSlots()
      .flatMap((slot) => slot.entries)
      .reduce(
        (sum, entry) => {
          const ratio = entry.weight / 100;
          const productOrRecipe = this.extractProductOrRecipe(entry);
          sum.calories += productOrRecipe.calories * ratio;
          sum.carbs += productOrRecipe.carbs * ratio;
          sum.fat += productOrRecipe.fat * ratio;
          sum.protein += productOrRecipe.protein * ratio;
          return sum;
        },
        { calories: 0, protein: 0, fat: 0, carbs: 0 },
      ),
  );

  private extractProductOrRecipe(entry: IDayPlanEntry): IRecipe | IProduct {
    return entry.productId
      ? (entry as IDayPlanProductEntry).product
      : (entry as IDayPlanRecipeEntry).recipe;
  }

  $newTimeSlot = signal('00:00');
  $timeSlotError = signal<string | null>(null);

  $openPickerSlot = signal<number | null>(null);
  $pickerTab = signal<'recipes' | 'products'>('recipes');
  $pickerSelections = signal<PickerSelection[]>([]);

  prepareAddTimePopover() {
    this.$newTimeSlot.set('00:00');
    this.$timeSlotError.set(null);
  }

  closeAddTimePopover() {
    this.$timeSlotError.set(null);
  }

  addTimeSlot(popover: HTMLElement) {
    const time = this.$newTimeSlot();
    if (!time) {
      this.$timeSlotError.set('Оберіть час');
      return;
    }

    const timeInMin = this.timeToMinutes(time);

    const exists = this.$timeSlots().some((slot) => slot.time === timeInMin);
    if (exists) {
      this.$timeSlotError.set('Такий час вже додано');
      return;
    }

    this.$timeSlots.update((slots) =>
      [...slots, { time: timeInMin, entries: [] }].sort(
        (a, b) => a.time - b.time,
      ),
    );
    popover.hidePopover();
    this.closeAddTimePopover();
  }

  $editedTimeSlot = signal<{ time: number; entries: IDayPlanEntry[] } | null>(
    null,
  );

  editEntries(entriesForm: IDayPlanEntryFormModel) {
    this.$timeSlots.update((current) => {
      const editedTimeSlot = this.$editedTimeSlot();
      if (editedTimeSlot === null) return current;

      const editedTimeSlotIndex = current.findIndex(
        (timeSlot) => timeSlot.time === editedTimeSlot?.time,
      );
      if (editedTimeSlotIndex === -1) return current;
      return current.toSpliced(editedTimeSlotIndex, 1, {
        time: editedTimeSlot.time,
        entries: [
          ...entriesForm.recipes.map(
            (recipe): IDayPlanRecipeEntry => ({
              ...recipe,
              recipeId: recipe.id,
              recipe,
            }),
          ),
          ...entriesForm.products.map(
            (product): IDayPlanProductEntry => ({
              ...product,
              product,
              productId: product.id,
            }),
          ),
        ],
      });
    });
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  openPickerFor(time: number, popover: HTMLElement) {
    this.$openPickerSlot.set(time);
    this.$pickerSelections.set([]);
    this.$pickerTab.set('recipes');
    popover.showPopover();
  }

  closePickerPopover(popover: HTMLElement) {
    this.$openPickerSlot.set(null);
    this.$pickerSelections.set([]);
    popover.hidePopover();
  }

  togglePickerItem(type: 'recipe' | 'product', id: string | number) {
    const sid = String(id);
    this.$pickerSelections.update((selections) => {
      const exists = selections.some((s) => s.type === type && s.id === sid);
      if (exists) {
        return selections.filter((s) => !(s.type === type && s.id === sid));
      }
      return [...selections, { type, id: sid, weight: 100 }];
    });
  }

  isSelectedInPicker(type: 'recipe' | 'product', id: string | number): boolean {
    return this.$pickerSelections().some(
      (s) => s.type === type && s.id === String(id),
    );
  }

  getPickerItemWeight(type: 'recipe' | 'product', id: string | number): number {
    return (
      this.$pickerSelections().find(
        (s) => s.type === type && s.id === String(id),
      )?.weight ?? 100
    );
  }

  setPickerItemWeight(
    type: 'recipe' | 'product',
    id: string | number,
    weight: number,
  ) {
    const sid = String(id);
    this.$pickerSelections.update((selections) =>
      selections.map((s) =>
        s.type === type && s.id === sid ? { ...s, weight } : s,
      ),
    );
  }

  confirmPickerSelections(popover: HTMLElement) {
    const time = this.$openPickerSlot();
    if (!time) return;

    const selections = this.$pickerSelections();

    this.$timeSlots.update((slots) =>
      slots.map((slot) => {
        if (slot.time !== time) return slot;

        const newEntries: IDayPlanEntry[] = selections.map((sel) => {
          if (sel.type === 'product') {
            const product = this.$products().find(
              (p) => String(p.id) === sel.id,
            )!;
            return {
              productId: product.id,
              name: product.name,
              imageUrl: product.imageUrl,
              weight: sel.weight,
              time,
              product,
            } as IDayPlanProductEntry;
          } else {
            const recipe = this.$recipes().find(
              (r) => String(r.id) === sel.id,
            )!;
            return {
              recipeId: recipe.id,
              name: recipe.name,
              imageUrl: recipe.imageUrl,
              weight: sel.weight,
              time,
              recipe,
            } as IDayPlanRecipeEntry;
          }
        });

        return { ...slot, entries: [...slot.entries, ...newEntries] };
      }),
    );

    this.closePickerPopover(popover);
  }

  createDayPlan() {
    const formValue = this.dayPlanForm().value();
    const request: ICreateDayPlanRequest = {
      ...formValue,
      entries: this.$timeSlots().flatMap((slot) => slot.entries),
    };
    this.dayPlanClient.create(request).subscribe((r) => {
      console.log(r);
    });
  }
}
