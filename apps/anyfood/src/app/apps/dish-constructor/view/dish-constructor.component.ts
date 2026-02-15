import {Component, inject, signal} from "@angular/core";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {IngredientsSearchComponent} from "../features/ingredients-search/ingredients-search.component";
import {AnyfoodInputComponent, AnyfoodSelectionComponent} from "@anyfood/ui";
import {Field, form} from "@angular/forms/signals";
import {IngredientClient} from "../../../core/api/ingredient/ingredient.client";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'dish-constructor',
  templateUrl: 'dish-constructor.component.html',
  imports: [
    ReactiveFormsModule,
    IngredientsSearchComponent,
    AnyfoodInputComponent,
    AnyfoodSelectionComponent,
    Field
  ]
})
export class DishConstructorComponent {
  fb = inject(NonNullableFormBuilder);
  ingredientsClient = inject(IngredientClient);

  $formModel = signal({
    name: '',
    description: '',
    ingredients: []
  })
  form = form(this.$formModel);


  ingredientsSearch = (input: string): Promise<{ id: string; name: string; img: string }[]> => {
    return firstValueFrom(this.ingredientsClient.searchIngredients(input));
  }

  createStep() {

  }

}
