import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly $counters = signal<Map<string, number>>(new Map());

  readonly $isAnyLoading = computed(() =>
    [...this.$counters().values()].some((count) => count > 0)
  );

  start(key: string): void {
    this.$counters.update((map) => {
      const next = new Map(map);
      next.set(key, (next.get(key) ?? 0) + 1);
      return next;
    });
  }

  stop(key: string): void {
    this.$counters.update((map) => {
      const next = new Map(map);
      const count = next.get(key) ?? 0;
      count <= 1 ? next.delete(key) : next.set(key, count - 1);
      return next;
    });
  }

  isLoading(key: string) {
    return computed(() => (this.$counters().get(key) ?? 0) > 0);
  }
}
