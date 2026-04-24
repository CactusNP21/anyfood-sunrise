import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'anyfood-image',
  standalone: true,
  template: `
    <img [ngSrc]="$imageSrc()" alt="image" [width]="$width()" [height]="$height()">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgOptimizedImage
  ]
})
export class AnyfoodImageComponent {
  $src = input.required<string | null>({alias: 'src'});
  $width = input<number>(0, {alias: 'width'});
  $height = input<number>(0,  {alias: 'height'});

  $imageSrc = computed(() => {
    const src = this.$src();
    return src ? src : '/placeholder.jpg';
  })
}
