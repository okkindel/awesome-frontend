import { HostBinding, Directive, input } from '@angular/core';
import { LibraryTechnology } from '@api/models';

@Directive({
  selector: '[cfTechnologyBadge]',
})
export class TechnologyBadgeDirective {
  public readonly type = input<LibraryTechnology>();

  @HostBinding('class') public get classes(): string {
    switch (this.type()) {
      case LibraryTechnology.Angular:
        return '!text-red-500';
      case LibraryTechnology.React:
        return '!text-indigo-500';
      case LibraryTechnology['JS/TS']:
        return '!text-yellow-500';
      case LibraryTechnology.Tailwind:
        return '!text-sky-300';
      default:
        return '!text-gray-300';
    }
  }
}
