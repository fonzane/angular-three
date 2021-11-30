// GENERATED

import { NgtHelper, NGT_OBJECT_CONTROLLER_PROVIDER } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-box-helper',
  exportAs: 'ngtBoxHelper',
  providers: [
    {
      provide: NgtHelper,
      useExisting: NgtBoxHelper,
    },
    NGT_OBJECT_CONTROLLER_PROVIDER,
  ],
})
export class NgtBoxHelper extends NgtHelper<THREE.BoxHelper> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof THREE.BoxHelper>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof THREE.BoxHelper>) {
    this.helperArgs = v;
  }

  helperType = THREE.BoxHelper;
}

@NgModule({
  declarations: [NgtBoxHelper],
  exports: [NgtBoxHelper],
})
export class NgtBoxHelperModule {}
