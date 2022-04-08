// GENERATED
import {
    AnyConstructor,
    NgtCommonGeometry,
    provideCommonGeometryFactory,
} from '@angular-three/core';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    NgModule,
} from '@angular/core';
import * as THREE from 'three';

@Component({
    selector: 'ngt-icosahedron-geometry',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideCommonGeometryFactory<THREE.IcosahedronGeometry>(
            NgtIcosahedronGeometry
        ),
    ],
})
export class NgtIcosahedronGeometry extends NgtCommonGeometry<THREE.IcosahedronGeometry> {
    static ngAcceptInputType_args:
        | ConstructorParameters<typeof THREE.IcosahedronGeometry>
        | undefined;

    @Input() set args(
        v: ConstructorParameters<typeof THREE.IcosahedronGeometry>
    ) {
        this.geometryArgs = v;
    }

    get geometryType(): AnyConstructor<THREE.IcosahedronGeometry> {
        return THREE.IcosahedronGeometry;
    }
}

@NgModule({
    declarations: [NgtIcosahedronGeometry],
    exports: [NgtIcosahedronGeometry],
})
export class NgtIcosahedronGeometryModule {}