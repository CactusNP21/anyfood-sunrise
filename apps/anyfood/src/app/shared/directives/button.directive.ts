import { booleanAttribute, Directive, input } from '@angular/core';

@Directive({
  selector: 'button',
  standalone: true,
  host: {
    '[attr.ghost]': 'ghost() || null',
    '[attr.secondary]': 'secondary() || null',
    '[attr.danger]': 'danger() || null',
    '[attr.success]': 'success() || null',
    '[attr.xs]': 'xs() || null',
    '[attr.sm]': 'sm() || null',
    '[attr.lg]': 'lg() || null',
    '[attr.xl]': 'xl() || null',
    '[attr.icon]': 'icon() || null',
    '[attr.block]': 'block() || null',
  },
})
export class ButtonDirective {
  ghost = input(false, { transform: booleanAttribute });
  secondary = input(false, { transform: booleanAttribute });
  danger = input(false, { transform: booleanAttribute });
  success = input(false, { transform: booleanAttribute });
  xs = input(false, { transform: booleanAttribute });
  sm = input(false, { transform: booleanAttribute });
  lg = input(false, { transform: booleanAttribute });
  xl = input(false, { transform: booleanAttribute });
  icon = input(false, { transform: booleanAttribute });
  block = input(false, { transform: booleanAttribute });
}
