// GENERATED
import { AnyConstructor, NgtCommonCurve, provideCommonCurveRef } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'ngt-line-curve3',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCommonCurveRef(NgtLineCurve3)],
})
export class NgtLineCurve3 extends NgtCommonCurve<THREE.LineCurve3> {
  static ngAcceptInputType_args: ConstructorParameters<typeof THREE.LineCurve3> | undefined;

  override get curveType(): AnyConstructor<THREE.LineCurve3> {
    return THREE.LineCurve3;
  }
}

@NgModule({
  declarations: [NgtLineCurve3],
  exports: [NgtLineCurve3],
})
export class NgtLineCurve3Module {}
