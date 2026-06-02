import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  model,
} from '@angular/core';
import { AnyfoodLabelComponent } from '../label/anyfood-label.component';
import {
  FormValueControl,
  RequiredValidationError,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'anyfood-input',
  imports: [AnyfoodLabelComponent],
  templateUrl: './anyfood-input.component.html',
  styleUrl: './anyfood-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnyfoodInputComponent
  implements FormValueControl<string | number | null>
{
  value = model<string | number | null>('');

  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  touched = model<boolean>(false);
  invalid = input<boolean>(false);

  $label = input.required({ alias: 'label' });
  $placeholder = input('Введіть значення', { alias: 'placeholder' });
  $autocomplete = input('off', { alias: 'autocomplete' });
  $type = input('text', { alias: 'type' });
  $id = input.required({ alias: 'inputID' });

  valueChange(inputElement: HTMLInputElement) {
    const type = this.$type();
    if (type === 'number') {
      this.value.set(inputElement.valueAsNumber);
      return;
    }
    this.value.set(inputElement.value);
  }
}
