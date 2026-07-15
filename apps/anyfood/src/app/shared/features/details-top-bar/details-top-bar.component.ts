import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../core/entities/product/product.entity';
import { AuthFacade } from '../../../apps/auth/data-access/facades/auth.facade';

export interface IUserEntity {
  userId: string | null;
  isSystem: boolean;
}

@Component({
  selector: 'app-details-top-bar',
  imports: [RouterLink],
  templateUrl: './details-top-bar.component.html',
})
export class DetailsTopBarComponent {
  private readonly authFacade = inject(AuthFacade);

  $userEntity = input.required<IUserEntity>({ alias: 'userEntity' });

  readonly $canEdit = computed(() => {
    const entity = this.$userEntity();
    const user = this.authFacade.currentUser();
    if (!entity || !user) return false;
    if (entity.isSystem) return this.authFacade.isAdmin();
    return entity.userId === user.id;
  });

  $backwardRoute = input.required<string>({ alias: 'backwardRoute' });
  $title = input.required<string>({ alias: 'title' });
  $editRoute = input.required<string>({ alias: 'editRoute' });
}
