import {
  Component, computed,
  ElementRef,
  inject,
  input, InputSignal, linkedSignal,
  model,
  Renderer2, resource, runInInjectionContext,
  signal,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {AnyfoodLabelComponent} from "@anyfood/ui";
import {Field, form, FormValueControl} from "@angular/forms/signals";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {NgOptimizedImage} from "@angular/common";
import {Prettify} from "../../../../../apps/anyfood/src/app/core/types/prettify.type";
import {of} from "rxjs";

@Component({
  selector: 'anyfood-selection',
  imports: [
    AnyfoodLabelComponent,
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    Field,
    NgOptimizedImage
  ],
  templateUrl: './anyfood-selection.component.html',
  styleUrl: './anyfood-selection.component.css',
})
export class AnyfoodSelectionComponent<T, O extends {}> implements FormValueControl<T[]> {

  isOpen = false;

  value = model<T[]>([]);
  $options = model<O[]>([], {alias: 'options'});

  $label = input.required({alias: 'label'});
  $placeholder = input('Введіть значення', {alias: 'placeholder'});
  $primaryKey = input.required<keyof O>({alias: 'primaryKey'});
  $displayKey = input.required<keyof O>({alias: 'displayKey'});

  $imgKey = input.required<keyof {
    [K in keyof O]: O[K] extends string
      ? O[K]
      : never
  }>({alias: 'imgKey'});

  getImg(option: O): string {
    const imgKey = this.$imgKey();

    return option[imgKey as keyof O] as string || 'empty';
  }

  $serverSearchFn = input<((input: string) => Promise<O[]>) | null>(null, {alias: 'serverSearchFn'});

  $input = form(signal(''));

  optionsResource = resource({
    params: () => ({input: this.$input().value()}),
    stream: async (param) => {
      const ssf = this.$serverSearchFn();
      return signal({value: await ssf!(param.params.input)})
    },
  })

  $optionsList = linkedSignal<O[] | undefined, O[]>({
    source: this.optionsResource.value,
    computation: (newOptions, previous) => {
      let result = []
      if (newOptions === undefined) result = previous?.value ?? [];
      else result = newOptions;
      return result;
    }
  })


  private filterOptions(input: string) {
    const displayKey = this.$displayKey();
    const options = this.$options();

    const filteredOptions = options.filter(opt => {
      const val = opt[displayKey] as string;
      return val.includes(input);
    })

    return new Promise<O[]>(() => filteredOptions)
  }

  toggleOption(option: O) {
    const primaryKey = this.$primaryKey();
    // this.value.update((currentValue) => {
    //   currentValue.find((v) => v[primaryKey] === option[primaryKey])
    // })
  }
}
