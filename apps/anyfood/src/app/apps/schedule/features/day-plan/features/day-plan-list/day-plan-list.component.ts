import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonDirective } from '../../../../../../shared/directives/button.directive';
import { RouterLink } from '@angular/router';
import { DayPlanClient } from '../../../../../../core/clients/day-plan/day-plan.client';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-day-plan-list',
  imports: [ButtonDirective, RouterLink],
  templateUrl: './day-plan-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayPlanListComponent {
  dayPlanClient = inject(DayPlanClient);

  $dayPlans = toSignal(this.dayPlanClient.getMyDayPlans(), {initialValue: []})
}
