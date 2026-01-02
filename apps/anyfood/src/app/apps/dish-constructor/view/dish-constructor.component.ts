import {Component, inject} from "@angular/core";
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {IngredientsSearchComponent} from "../features/ingredients-search/ingredients-search.component";

@Component({
  selector: 'dish-constructor',
  templateUrl: 'dish-constructor.component.html',
  imports: [
    ReactiveFormsModule,
    IngredientsSearchComponent
  ]
})
export class DishConstructorComponent {
  fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', ],
    dishComponents: [[]],
    cookingSteps: [[]]
  })

  createStep() {

  }

}
