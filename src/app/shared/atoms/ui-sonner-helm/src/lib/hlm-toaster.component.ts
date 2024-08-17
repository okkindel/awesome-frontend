import {
  ChangeDetectionStrategy,
  booleanAttribute,
  numberAttribute,
  Component,
  input,
} from '@angular/core';
import { NgxSonnerToaster, ToasterProps } from 'ngx-sonner';

@Component({
  selector: 'front-toaster',
  standalone: true,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      class="toaster group"
      [invert]="invert()"
      [theme]="theme()"
      [position]="position()"
      [hotKey]="hotKey()"
      [richColors]="richColors()"
      [expand]="expand()"
      [duration]="duration()"
      [visibleToasts]="visibleToasts()"
      [closeButton]="closeButton()"
      [toastOptions]="toastOptions()"
      [offset]="offset()"
      [dir]="dir()"
      [class]="_class()"
      [style]="_style()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmToasterComponent {
  public invert = input<ToasterProps['invert'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  public theme = input<ToasterProps['theme']>('light');
  public position = input<ToasterProps['position']>('bottom-right');
  public hotKey = input<ToasterProps['hotkey']>(['altKey', 'KeyT']);
  public richColors = input<ToasterProps['richColors'], boolean | string>(
    false,
    {
      transform: booleanAttribute,
    },
  );
  public expand = input<ToasterProps['expand'], boolean | string>(false, {
    transform: booleanAttribute,
  });
  public duration = input<ToasterProps['duration'], number | string>(4000, {
    transform: numberAttribute,
  });
  public visibleToasts = input<ToasterProps['visibleToasts'], number | string>(
    3,
    {
      transform: numberAttribute,
    },
  );
  public closeButton = input<ToasterProps['closeButton'], boolean | string>(
    false,
    {
      transform: booleanAttribute,
    },
  );
  public toastOptions = input<ToasterProps['toastOptions']>({
    classes: {
      toast:
        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
      description: 'group-[.toast]:text-muted-foreground',
      actionButton:
        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
      cancelButton:
        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    },
  });
  public offset = input<ToasterProps['offset']>(null);
  public dir = input<ToasterProps['dir']>('auto');
  public _class = input('', { alias: 'class' });
  public _style = input<Record<string, string>>({}, { alias: 'style' });
}
