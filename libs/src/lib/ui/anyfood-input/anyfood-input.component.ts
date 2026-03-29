import { Component, effect, input, model } from '@angular/core';
import { AnyfoodLabelComponent } from '../label/anyfood-label.component';
import {
  FormValueControl,
  ValidationError,
  WithOptionalFieldTree,
} from '@angular/forms/signals';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'anyfood-input',
  imports: [AnyfoodLabelComponent],
  templateUrl: './anyfood-input.component.html',
  styleUrl: './anyfood-input.component.css',
})
export class AnyfoodInputComponent implements FormValueControl<string> {
  value = model('');

  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  touched = model<boolean>(false);
  invalid = input<boolean>(false);

  $label = input.required({ alias: 'label' });
  $placeholder = input('Введіть значення', { alias: 'placeholder' });
  $autocomplete = input('off', { alias: 'autocomplete' });
  $type = input('text', {alias: 'type'})
  $id = input.required({alias: 'inputID'});
}
