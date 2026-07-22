import { Component, computed, inject, signal } from '@angular/core';
import { AnyfoodImageComponent } from '@anyfood/ui';
import { ButtonDirective } from '../../../../shared/directives/button.directive';
import { RouterLink } from '@angular/router';
import { FridgeClient } from '../../../../core/clients/fridge/fridge.client';

@Component({
  selector: 'app-fridge-list',
  imports: [AnyfoodImageComponent, ButtonDirective, RouterLink],
  templateUrl: 'fridge-list.component.html',
})
export class FridgeListComponent {

  fridgeClient = inject(FridgeClient);

  $fridgeProducts = computed(() => {
    const fridge = this.fridgeClient.fridgeResource.value();
    return fridge?.items ?? []
  })

}
