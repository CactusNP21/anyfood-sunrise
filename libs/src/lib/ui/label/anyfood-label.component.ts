import {Component, input} from '@angular/core';

@Component({
  selector: 'anyfood-label',
  imports: [],
  templateUrl: './anyfood-label.component.html',
  styleUrl: './anyfood-label.component.css'
})
export class AnyfoodLabelComponent {
  $text = input.required({alias: 'text'});

  $controlId = input.required({alias: 'controlId'});
}
