import {Component, inject, signal} from "@angular/core";
import {IngredientClient} from "../../../../core/api/ingredient/ingredient.client";
import {Subject, switchMap, throttleTime} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'ingredients-search',
  imports: [
    ReactiveFormsModule
  ],
  template: `
    <div>
      <label>Шукайте</label>
      <input [formControl]="inputControl">
      <div>

      </div>
    </div>
  `
})
export class IngredientsSearchComponent {
  ingredientsClient = inject(IngredientClient);

  inputControl = new FormControl<string>('');

  $ingredients = signal([]);


  inputChange$ = new Subject<string>();

  constructor() {
    this.listenToInputChange();
  }

  listenToInputChange() {
    this.inputControl.valueChanges.pipe(
      throttleTime(200),
      switchMap((name) => this.ingredientsClient.searchIngredients(name ?? '')),
      takeUntilDestroyed()
    ).subscribe(inputValue => {
      // @ts-ignore
      this.$ingredients.set(inputValue!);
    })
  }
}
