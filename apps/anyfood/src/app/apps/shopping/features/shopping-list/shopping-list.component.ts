import { Component, inject } from '@angular/core';
import {
  IMyShoppingList,
  ShoppingListClient,
} from '../../../../core/clients/shopping-list/shopping-list.client';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnyfoodImageComponent } from '@anyfood/ui';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  imports: [AnyfoodImageComponent, DecimalPipe, RouterLink, DatePipe],
})
export class ShoppingListComponent {
  shoppingListClient = inject(ShoppingListClient);

  $shoppingList = toSignal<IMyShoppingList[], IMyShoppingList[]>(
    this.shoppingListClient.getMy(),
    { initialValue: [] },
  );
}
