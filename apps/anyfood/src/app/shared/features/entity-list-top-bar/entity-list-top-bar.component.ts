import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AuthFacade } from '../../../apps/auth/data-access/facades/auth.facade';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '../../directives/button.directive';

@Component({
  selector: 'app-entity-listy-top-bar',
  templateUrl: 'entity-list-top-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ButtonDirective],
})
export class EntityListyTopBarComponent {
  authFacade = inject(AuthFacade);

  $title = input.required<string>({ alias: 'title' });
  $subtitle = input.required<string>({ alias: 'subtitle' });
}
