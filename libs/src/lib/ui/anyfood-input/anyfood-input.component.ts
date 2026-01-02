import {Component, input} from '@angular/core';
import {AnyfoodLabelComponent} from "@anyfood/ui";

@Component({
  selector: 'lib-anyfood-input',
  imports: [
    AnyfoodLabelComponent
  ],
  templateUrl: './anyfood-input.component.html',
  styleUrl: './anyfood-input.component.css'
})
export class AnyfoodInputComponent {
  $label = input.required({alias: 'label'});
}
