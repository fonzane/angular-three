import { AnimationReady, InstancesStore } from '@angular-three/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LOD, Mesh } from 'three';

@Component({
  selector: 'demo-lods',
  template: `
    <ngt-icosahedronGeometry
      ngtId="highestDetail"
      [args]="[100, 16]"
    ></ngt-icosahedronGeometry>
    <ngt-icosahedronGeometry
      ngtId="highDetail"
      [args]="[100, 8]"
    ></ngt-icosahedronGeometry>
    <ngt-icosahedronGeometry
      ngtId="normal"
      [args]="[100, 4]"
    ></ngt-icosahedronGeometry>
    <ngt-icosahedronGeometry
      ngtId="lowDetail"
      [args]="[100, 2]"
    ></ngt-icosahedronGeometry>
    <ngt-icosahedronGeometry
      ngtId="lowestDetail"
      [args]="[100, 1]"
    ></ngt-icosahedronGeometry>
    <ngt-meshLambertMaterial
      ngtId="lambertMaterial"
      [parameters]="{ color: '#ffffff', wireframe: true }"
    ></ngt-meshLambertMaterial>

    <ngt-lod
      *ngFor="let position of amount"
      [position]="position"
      [matrixAutoUpdate]="false"
      (zonelessReady)="onLodReady($event)"
      (animateReady)="onLodAnimateReady($event)"
    ></ngt-lod>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LodComponent {
  amount = Array.from({ length: 1000 })
    .fill(undefined)
    .map(
      () =>
        [this.getXZ(), this.getY(), this.getXZ()] as [number, number, number]
    );

  geometries = [
    {
      id: 'highestDetail',
      distance: 50,
    },
    {
      id: 'highDetail',
      distance: 300,
    },
    {
      id: 'normal',
      distance: 1000,
    },
    {
      id: 'lowDetail',
      distance: 2000,
    },
    {
      id: 'lowestDetail',
      distance: 8000,
    },
  ];

  constructor(private readonly instancesStore: InstancesStore) {}

  getXZ() {
    return 10000 * (0.5 - Math.random());
  }

  getY() {
    return 7500 * (0.5 - Math.random());
  }

  onLodReady(lod: LOD) {
    const {
      bufferGeometries,
      materials,
    } = this.instancesStore.getImperativeState();
    const material = materials['lambertMaterial'];
    this.geometries.forEach(({ id: geometryId, distance }) => {
      const geometry = bufferGeometries[geometryId];
      const mesh = new Mesh(geometry, material);
      mesh.scale.set(1.5, 1.5, 1.5);
      lod.addLevel(mesh, distance);
    });
  }

  onLodAnimateReady({ animateObject }: AnimationReady<LOD>) {
    animateObject.rotation.z = animateObject.rotation.x += 0.01;
  }
}