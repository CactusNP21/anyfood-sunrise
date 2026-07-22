import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  ModelSignal,
  signal,
  viewChild,
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
  TOption extends object,
  TValueKey extends keyof TOption | never,
  TValue = TValueKey extends never ? TOption : TOption[TValueKey],
> implements FormValueControl<TValue[] | TValue>
{
  value = model.required<TValue[] | TValue>();
  $options = model.required<TOption[]>({ alias: 'options' });

  $multiple = input(true, { alias: 'multiple' });

  $label = input.required<string>({ alias: 'label' });
  $placeholder = input('Введіть значення', { alias: 'placeholder' });
  $primaryKey = input<keyof TOption>(undefined, { alias: 'primaryKey' });
  $valueKey = input<TValueKey>(undefined, { alias: 'valueKey' });
  $displayKey = input<keyof TOption | undefined>(undefined, {
    alias: 'displayKey',
  });
  $id = input.required<string>({ alias: 'inputID' });
  $imgKey = input<keyof TOption | undefined>(undefined, { alias: 'imgKey' });

  $inputEl = viewChild.required<ElementRef<HTMLInputElement>>('inputElement');

  $filteredOptions = computed(() => {
    const displayKey = this.$displayKey();
    const options = this.$options();
    if (!displayKey) return options;

    const input = this.$input().value();
    return options.filter((option) =>
      (option[displayKey] as string).toLowerCase().includes(input),
    );
  });

  // Single source of truth for "what's currently selected", regardless of mode.
  private $valuesArray = computed<TValue[]>(() => {
    if (this.$multiple()) return this.value() as TValue[];
    const v = this.value() as TValue | undefined;
    return v === undefined || v === null ? [] : [v];
  });

  $valueMap = computed(() => {
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

    for (const item of this.$valuesArray()) {
      const key = valueKey !== undefined ? item : extractKey(item);
      map.set(key, item as unknown as TOption);
    }

    return map;
  });

  $input = form(signal(''));
  $isOverlayOpen = signal(false);

  $selectedOptions = computed<TOption[]>(() => {
    const valueMap = this.$valueMap();
    const options = this.$options();
    const primaryKey = this.$primaryKey();

    return options.filter((opt) => {
      const key = primaryKey ? opt[primaryKey] : opt;
      return valueMap.has(key);
    });
  });

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
    const extracted = this.extractValue(option);
    return this.$valuesArray().some((v) => this.valuesEqual(v, extracted));
  }

  toggleOption(option: TOption): void {
    const extracted = this.extractValue(option);

    if (this.$multiple()) {
      const isAlreadySelected = this.isSelected(option);
      (this.value as ModelSignal<TValue[]>).update((current) =>
        isAlreadySelected
          ? current.filter((v) => !this.valuesEqual(v, extracted))
          : [...current, extracted],
      );
    } else {
      // single mode: just replace, don't toggle off — keeps the type TValue (no undefined)
      (this.value as ModelSignal<TValue>).set(extracted);
      this.closeOverlay();
    }

    requestAnimationFrame(() => {
      this.$inputEl().nativeElement.focus();
    });
  }

  getDisplay(option: TOption): string {
    const displayKey = this.$displayKey();
    return displayKey ? String(option[displayKey]) : String(option);
  }

  getImg(option: TOption): string {
    const imgKey = this.$imgKey();
    return imgKey ? (option[imgKey] as unknown as string) || 'empty' : '';
  }

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
