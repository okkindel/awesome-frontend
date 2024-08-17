import { NgModule } from '@angular/core';

import { HlmFormFieldModule } from './ui-formfield-helm/src';
import { HlmButtonModule } from './ui-button-helm/src';
import { HlmInputModule } from './ui-input-helm/src';
import { HlmIconModule } from './ui-icon-helm/src';

const ATOMS = [
  HlmFormFieldModule,
  HlmButtonModule,
  HlmInputModule,
  HlmIconModule,
];

@NgModule({ imports: ATOMS, exports: ATOMS })
export class AtomsModule {}
