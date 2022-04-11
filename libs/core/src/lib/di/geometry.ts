import { Provider } from '@angular/core';
import * as THREE from 'three';
import { NgtInstance } from '../abstracts/instance';
import { NgtCommonGeometry } from '../three/geometry';
import { NGT_COMMON_GEOMETRY_FACTORY } from '../tokens';
import { AnyConstructor } from '../types';
import { provideInstanceFactory } from './instance';

export function provideCommonGeometryFactory<
    TGeometry extends THREE.BufferGeometry,
    TSubGeometry extends NgtCommonGeometry<TGeometry> = NgtCommonGeometry<TGeometry>
>(
    subGeometryType: AnyConstructor<TSubGeometry>,
    factory?: (sub: TSubGeometry) => TGeometry
): Provider {
    return [
        provideInstanceFactory<TGeometry>(
            subGeometryType as unknown as AnyConstructor<NgtInstance<TGeometry>>
        ),
        { provide: NgtCommonGeometry, useExisting: subGeometryType },
        {
            provide: NGT_COMMON_GEOMETRY_FACTORY,
            useFactory: (subGeometry: TSubGeometry) => {
                return () => factory?.(subGeometry) || subGeometry.geometry;
            },
            deps: [subGeometryType],
        },
    ];
}
