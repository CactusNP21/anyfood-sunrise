import { Component, computed, inject } from '@angular/core';
import { AnyfoodImageComponent } from '@anyfood/ui';
import { ButtonDirective } from '../../../../../../shared/directives/button.directive';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DetailsTopBarComponent } from '../../../../../../shared/features/details-top-bar/details-top-bar.component';
import { DayPlanClient } from '../../../../../../core/clients/day-plan/day-plan.client';
import { ActivatedRoute } from '@angular/router';
import {
  DayScheduleComponent,
  IDayPlanTimeSlot,
} from '../../components/day-schedule.component';
import { ICreateDayPlanEntry } from '../../../../../../core/clients/day-plan/models/day-plan-client.model';
import { IDayPlanEntry } from '../../../../../../core/entities/day-plan.entity';

@Component({
  selector: 'app-day-plan-detail',
  imports: [
    AnyfoodImageComponent,
    ButtonDirective,
    DatePipe,
    DecimalPipe,
    DetailsTopBarComponent,
    DayScheduleComponent,
  ],
  templateUrl: './day-plan-detail.component.html',
})
export class DayPlanDetailComponent {
  dayPlansClient = inject(DayPlanClient);
  private readonly activatedRoute = inject(ActivatedRoute);

  dayPlan = this.dayPlansClient.getDayPlanDetails(
    this.activatedRoute.snapshot.params['id'],
  );

  $dayPlan = this.dayPlan.value;

  $daySlots = computed<IDayPlanTimeSlot[]>(() =>  {
    const dayPlan = this.$dayPlan();
    if (!dayPlan) return [];

    const grouped = new Map<number, IDayPlanEntry[]>();

    for (const entry of dayPlan.entries) {
      if (!grouped.has(entry.time)) {
        grouped.set(entry.time, []);
      }
      grouped.get(entry.time)?.push(entry);
    }

    return [...grouped.entries()]
      .map(([time, entries]) => ({ time, entries }))
      .sort((a, b) => a.time - b.time);
  })

  readonly $macroTotal = computed(() => {
    const p = this.dayPlan.value();
    if (!p) return 0;
    return (p.totalProtein ?? 0) + (p.totalFats ?? 0) + (p.totalCarbs ?? 0);
  });

  readonly $proteinPct = computed(() => {
    const total = this.$macroTotal();
    if (!total) return 0;
    return Math.round(((this.$dayPlan()?.totalProtein ?? 0) / total) * 100);
  });

  readonly $fatPct = computed(() => {
    const total = this.$macroTotal();
    if (!total) return 0;
    return Math.round(((this.$dayPlan()?.totalFats ?? 0) / total) * 100);
  });

  readonly $carbsPct = computed(() => {
    const total = this.$macroTotal();
    if (!total) return 0;
    return Math.round(((this.$dayPlan()?.totalCarbs ?? 0) / total) * 100);
  });
}
