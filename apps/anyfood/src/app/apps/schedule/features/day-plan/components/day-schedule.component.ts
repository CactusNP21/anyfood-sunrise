import { Component, input } from '@angular/core';
import { ButtonDirective } from '../../../../../shared/directives/button.directive';
import { MinutesToTimePipe } from '../features/day-plan-editor/pipes/minutes-to-time.pipe';
import { IDayPlanEntry } from '../../../../../core/entities/day-plan.entity';

export interface IDayPlanTimeSlot { time: number; entries: IDayPlanEntry[] }

@Component({
  selector: 'app-day-schedule',
  imports: [ButtonDirective, MinutesToTimePipe],
  templateUrl: 'day-schedule.component.html',
})
export class DayScheduleComponent {

  $timeSlots = input.required<IDayPlanTimeSlot[]>({alias: 'timeSlots'});


}
