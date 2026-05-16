import { Component, inject } from '@angular/core';
import {
  IMyShoppingList,
  ShoppingListClient,
} from '../../../../core/clients/shopping-list/shopping-list.client';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnyfoodImageComponent } from '@anyfood/ui';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  imports: [AnyfoodImageComponent],
})
export class ShoppingListComponent {
  shoppingListClient = inject(ShoppingListClient);

  $shoppingList = toSignal<IMyShoppingList[], IMyShoppingList[]>(
    this.shoppingListClient.getMy(),
    { initialValue: [] },
  );
}
