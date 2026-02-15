import {Component, input, model} from '@angular/core';
import {AnyfoodLabelComponent} from "@anyfood/ui";
import {FormValueControl} from "@angular/forms/signals";

@Component({
  selector: 'anyfood-input',
  imports: [
    AnyfoodLabelComponent
  ],
  templateUrl: './anyfood-input.component.html',
  styleUrl: './anyfood-input.component.css'
})
export class AnyfoodInputComponent implements FormValueControl<string>{

  value = model('');

  $label = input.required({alias: 'label'});
  $placeholder = input('Введіть значення', {alias: 'placeholder'});
}
