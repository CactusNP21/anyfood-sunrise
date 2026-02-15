import {Component, input, model} from '@angular/core';
import {FormValueControl} from "@angular/forms/signals";

@Component({
  selector: 'anyfood-label',
  imports: [],
  templateUrl: './anyfood-label.component.html',
  styleUrl: './anyfood-label.component.css'
})
export class AnyfoodLabelComponent implements FormValueControl<string> {
  value = model('')

  $text = input.required({alias: 'text'});

  $controlId = input.required({alias: 'controlId'});
}
