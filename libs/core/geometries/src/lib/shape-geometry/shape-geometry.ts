// GENERATED
import { AnyConstructor, NgtCommonGeometry, provideCommonGeometryRef } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'ngt-shape-geometry',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCommonGeometryRef(NgtShapeGeometry)],
})
export class NgtShapeGeometry extends NgtCommonGeometry<THREE.ShapeGeometry> {
  static ngAcceptInputType_args: ConstructorParameters<typeof THREE.ShapeGeometry> | undefined;

  get geometryType(): AnyConstructor<THREE.ShapeGeometry> {
    return THREE.ShapeGeometry;
  }
}

@NgModule({
  declarations: [NgtShapeGeometry],
  exports: [NgtShapeGeometry],
})
export class NgtShapeGeometryModule {}
