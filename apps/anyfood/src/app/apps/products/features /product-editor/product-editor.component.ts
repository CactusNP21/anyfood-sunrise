import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-editor.component',
  imports: [],
  templateUrl: './product-editor.component.html',
  styleUrl: './product-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditorComponent {}
