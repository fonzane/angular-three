// GENERATED

import { NgtHelper, NGT_OBJECT_CONTROLLER_PROVIDER } from '@angular-three/core';
import { NgModule, Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-hemisphere-light-helper',
  exportAs: 'ngtHemisphereLightHelper',
  providers: [
    {
      provide: NgtHelper,
      useExisting: NgtHemisphereLightHelper,
    },
    NGT_OBJECT_CONTROLLER_PROVIDER,
  ],
})
export class NgtHemisphereLightHelper extends NgtHelper<THREE.HemisphereLightHelper> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof THREE.HemisphereLightHelper>
    | undefined;

  @Input() set args(
    v: ConstructorParameters<typeof THREE.HemisphereLightHelper>
  ) {
    this.helperArgs = v;
  }

  helperType = THREE.HemisphereLightHelper;
}

@NgModule({
  declarations: [NgtHemisphereLightHelper],
  exports: [NgtHemisphereLightHelper],
})
export class NgtHemisphereLightHelperModule {}
