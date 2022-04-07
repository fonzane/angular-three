import { InjectionToken, Provider } from '@angular/core';
import { NgtMaterialGeometry } from '../abstracts/material-geometry';
import { NgtObject } from '../abstracts/object';
import type { AnyConstructor, AnyFunction } from '../types';
import { provideObjectFactory } from './object';

export const NGT_MATERIAL_GEOMETRY_OBJECT_FACTORY =
    new InjectionToken<AnyFunction>('NgtMaterialGeometry factory');

export function provideMaterialGeometryObjectFactory<
    TSubMaterialGeometry extends NgtMaterialGeometry
>(subMaterialGeometryType: AnyConstructor<TSubMaterialGeometry>): Provider {
    return [
        provideObjectFactory(
            subMaterialGeometryType as unknown as AnyConstructor<NgtObject>
        ),
        { provide: NgtMaterialGeometry, useExisting: subMaterialGeometryType },
        {
            provide: NGT_MATERIAL_GEOMETRY_OBJECT_FACTORY,
            useFactory: (subMaterialGeometryObject: TSubMaterialGeometry) => {
                return () => subMaterialGeometryObject.object3d;
            },
            deps: [subMaterialGeometryType],
        },
    ];
}