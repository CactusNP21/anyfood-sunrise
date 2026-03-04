import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  InputSignal,
  linkedSignal,
  model,
  Renderer2,
  resource,
  runInInjectionContext,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { AnyfoodLabelComponent } from '../label/anyfood-label.component';
import { form, FormField, FormValueControl } from '@angular/forms/signals';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { NgOptimizedImage } from '@angular/common';

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
})
export class AnyfoodSelectionComponent<T extends {}>
  implements FormValueControl<T[]>
{
  $isOverlayOpen = signal(false);

  value = model<T[]>([]);
  $options = model<T[]>([], { alias: 'options' });

  $label = input.required({ alias: 'label' });
  $placeholder = input('Введіть значення', { alias: 'placeholder' });
  $primaryKey = input.required<keyof T>({ alias: 'primaryKey' });
  $displayKey = input.required<keyof T>({ alias: 'displayKey' });

  $imgKey = input.required<
    keyof {
      [K in keyof T]: T[K] extends string ? T[K] : never;
    }
  >({ alias: 'imgKey' });

  $valueMap = computed(() => {
    const value = this.value();
    const map = new Map<any, T>();
    value.forEach((item) => {
      map.set(item[this.$primaryKey()] as string, item);
    });
    return map;
  });

  getImg(option: T): string {
    const imgKey = this.$imgKey();

    return (option[imgKey as keyof T] as string) || 'empty';
  }

  $serverSearchFn = input<((input: string) => Promise<T[]>) | null>(null, {
    alias: 'serverSearchFn',
  });

  $input = form(signal(''));

  optionsResource = resource({
    params: () => ({ input: this.$input().value() }),
    stream: async (param) => {
      const ssf = this.$serverSearchFn();
      return signal({ value: await ssf!(param.params.input) });
    },
  });

  $optionsList = linkedSignal<T[] | undefined, T[]>({
    source: this.optionsResource.value,
    computation: (newOptions, previous) => {
      let result = [];
      if (newOptions === undefined) result = previous?.value ?? [];
      else result = newOptions;
      return result;
    },
  });

  private filterOptions(input: string) {
    const displayKey = this.$displayKey();
    const options = this.$options();

    const filteredOptions = options.filter((opt) => {
      const val = opt[displayKey] as string;
      return val.includes(input);
    });

    return new Promise<T[]>(() => filteredOptions);
  }

  openOverlay() {
    this.$isOverlayOpen.set(true);
  }

  closeOverlay() {
    if (this.$isOverlayOpen()) {
      this.$isOverlayOpen.set(false);
    }
  }

  toggleOption(option: T) {
    const primaryKey = this.$primaryKey();
    const map = this.$valueMap();

    if (map.has(option[primaryKey])) {
      this.value.update((current) =>
        current.filter((value) => value[primaryKey] !== option[primaryKey])
      );
      return;
    }

    this.value.update((currentValue) => [...currentValue, option]);
  }

  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
    },
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
  protected readonly close = close;
}
