// GENERATED
import { AnyConstructor, NgtCommonGeometry, provideCommonGeometryRef } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'ngt-extrude-geometry',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCommonGeometryRef(NgtExtrudeGeometry)],
})
export class NgtExtrudeGeometry extends NgtCommonGeometry<THREE.ExtrudeGeometry> {
  static ngAcceptInputType_args: ConstructorParameters<typeof THREE.ExtrudeGeometry> | undefined;

  get geometryType(): AnyConstructor<THREE.ExtrudeGeometry> {
    return THREE.ExtrudeGeometry;
  }
}

@NgModule({
  declarations: [NgtExtrudeGeometry],
  exports: [NgtExtrudeGeometry],
})
export class NgtExtrudeGeometryModule {}
