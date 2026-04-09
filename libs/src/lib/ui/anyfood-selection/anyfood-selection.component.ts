import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ModelSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { AnyfoodLabelComponent } from '../label/anyfood-label.component';
import { form, FormField, FormValueControl } from '@angular/forms/signals';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { NgOptimizedImage } from '@angular/common';

function isObject(val: unknown): val is object {
  return typeof val === 'object' && val !== null;
}

@Component({
  selector: 'anyfood-selection',
  imports: [
    AnyfoodLabelComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    NgOptimizedImage,
    FormField,
  ],
  templateUrl: './anyfood-selection.component.html',
  styleUrl: './anyfood-selection.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnyfoodSelectionComponent<
  TOption,
  TValue extends TOption[keyof TOption] | TOption,
  TValueKey extends
    {
        [K in keyof TOption]: TOption[K] extends TValue ? K : never;
      }[keyof TOption]
    ,
> implements FormValueControl<TValue | TValue[] | undefined>
{
  value = model<TValue | TValue[] | undefined>();

  $options = model.required<TOption[]>({ alias: 'options' });
  $label = input.required<string>({ alias: 'label' });
  $placeholder = input('Введіть значення', { alias: 'placeholder' });
  $primaryKey = input<keyof TOption>(undefined, {
    alias: 'primaryKey',
  });
  $valueKey = input<TValueKey>(undefined, { alias: 'valueKey' });
  $displayKey = input<keyof TOption | undefined>(undefined, {
    alias: 'displayKey',
  });
  $id = input.required<string>({ alias: 'inputID' });
  $imgKey = input<keyof TOption | undefined>(undefined, { alias: 'imgKey' });

  $valueMap = computed(() => {
    const value = this.value();
    const primaryKey = this.$primaryKey();
    const valueKey = this.$valueKey();
    const map = new Map<unknown, TOption>();

    const extractKey = (item: unknown): unknown => {
      if (primaryKey && isObject(item)) {
        return (item as Record<keyof TOption, unknown>)[
          primaryKey as keyof TOption
        ];
      }
      return item;
    };

    const values = Array.isArray(value) ? value : [value];

    for (const item of values) {
      // якщо є valueKey — item це примітив витягнутий з об'єкта,
      // тому ключем є сам item, інакше — витягуємо через primaryKey
      const key = valueKey !== undefined ? item : extractKey(item);
      map.set(key, item as unknown as TOption);
    }

    return map;
  });

  $input = form(signal(''));
  $isOverlayOpen = signal(false);

  // --- Core helpers ---

  private extractValue(option: TOption): TValue {
    const valueKey = this.$valueKey();
    if (valueKey !== undefined) {
      return option[valueKey as keyof TOption] as unknown as TValue;
    }
    return option as unknown as TValue;
  }

  private valuesEqual(a: TValue, b: TValue): boolean {
    const primaryKey = this.$primaryKey();
    if (primaryKey && isObject(a) && isObject(b)) {
      return (
        (a as Record<keyof TOption, unknown>)[primaryKey as keyof TOption] ===
        (b as Record<keyof TOption, unknown>)[primaryKey as keyof TOption]
      );
    }
    return a === b;
  }

  isSelected(option: TOption): boolean {
    const value = this.value();
    const extracted = this.extractValue(option);

    if (Array.isArray(value)) {
      return value.some((v) => this.valuesEqual(v as TValue, extracted));
    }
    return this.valuesEqual(value as TValue, extracted);
  }

  // --- Actions ---

  toggleOption(option: TOption): void {
    const extracted = this.extractValue(option);
    const isAlreadySelected = this.isSelected(option);

    if (Array.isArray(this.value())) {
      (this.value as ModelSignal<TValue[]>).update((current) =>
        isAlreadySelected
          ? current.filter((v) => !this.valuesEqual(v as TValue, extracted))
          : [...current, extracted],
      );
      return;
    }

    (this.value as ModelSignal<TValue>).set(extracted);
  }

  // --- Display helpers ---

  getDisplay(option: TOption): string {
    const displayKey = this.$displayKey();
    return displayKey ? String(option[displayKey]) : String(option);
  }

  getImg(option: TOption): string {
    const imgKey = this.$imgKey();
    return imgKey ? (option[imgKey] as unknown as string) || 'empty' : '';
  }

  // --- Overlay ---

  openOverlay(): void {
    this.$isOverlayOpen.set(true);
  }

  closeOverlay(): void {
    if (this.$isOverlayOpen()) {
      this.$isOverlayOpen.set(false);
    }
  }

  positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      panelClass: 'mat-mdc-select-panel-above',
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      panelClass: 'mat-mdc-select-panel-above',
    },
  ];
}
