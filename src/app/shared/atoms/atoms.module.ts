import { NgModule } from '@angular/core';

import { HlmFormFieldModule } from './ui-formfield-helm/src';
import { HlmSpinnerModule } from './ui-spinner-helm/src';
import { HlmToasterModule } from './ui-sonner-helm/src';
import { HlmLabelDirective } from './ui-label-helm/src';
import { HlmButtonModule } from './ui-button-helm/src';
import { HlmInputModule } from './ui-input-helm/src';
import { HlmIconModule } from './ui-icon-helm/src';

const ATOMS = [
  HlmFormFieldModule,
  HlmLabelDirective,
  HlmSpinnerModule,
  HlmToasterModule,
  HlmButtonModule,
  HlmInputModule,
  HlmIconModule,
];

@NgModule({ imports: ATOMS, exports: ATOMS })
export class AtomsModule {}
