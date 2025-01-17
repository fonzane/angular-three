import {
  NgtCanvasModule,
  NgtComponentStore,
  NgtStore,
  NgtVector3,
  providePerformanceOptions,
  Ref,
} from '@angular-three/core';
import {
  NgtColorAttributeModule,
  NgtFogAttributeModule,
  NgtValueAttributeModule,
  NgtVector2AttributeModule,
} from '@angular-three/core/attributes';
import { NgtPlaneGeometryModule } from '@angular-three/core/geometries';
import { NgtGroupModule } from '@angular-three/core/group';
import { NgtDirectionalLightModule, NgtRectAreaLightModule, NgtSpotLightModule } from '@angular-three/core/lights';
import { NgtMeshStandardMaterialModule } from '@angular-three/core/materials';
import { NgtMeshModule } from '@angular-three/core/meshes';
import { NgtStatsModule } from '@angular-three/core/stats';
import { NgtEffectComposerModule } from '@angular-three/postprocessing';
import { NgtBloomEffectModule, NgtSSAOEffectModule } from '@angular-three/postprocessing/effects';
import { NgtSobaTextModule } from '@angular-three/soba/abstractions';
import { NgtGLTFLoader } from '@angular-three/soba/loaders';
import { NgtSobaAdapativeDprModule } from '@angular-three/soba/performances';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, Input, NgModule, NgZone, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlendFunction, KernelSize, SSAOEffect } from 'postprocessing';
import { Observable } from 'rxjs';
import * as THREE from 'three';
// @ts-ignore
import { FlakesTexture, GLTF, RectAreaLightUniformsLib } from 'three-stdlib';

RectAreaLightUniformsLib.init();
THREE.Vector2.prototype.equals = function (v, epsilon = 0.001) {
  return Math.abs(v.x - this.x) < epsilon && Math.abs(v.y - this.y) < epsilon;
};

@Injectable()
export class LerpedPointer extends NgtComponentStore {
  constructor(private zone: NgZone, private store: NgtStore) {
    super();
  }

  private readonly previous = new THREE.Vector2();
  readonly pointerRef = new Ref<THREE.Vector2>();

  load() {
    this.zone.runOutsideAngular(() => {
      this.onCanvasReady(
        this.store.ready$,
        () => {
          this.pointerRef.set(this.store.get((s) => s.pointer).clone());
          return this.store.registerBeforeRender({
            callback: ({ performance, pointer }) => {
              this.previous.copy(this.pointerRef.value);
              this.pointerRef.value.lerp(pointer, 0.1);
              // Regress system when the mouse is moved
              if (!this.previous.equals(this.pointerRef.value)) {
                performance.regress();
              }
            },
          });
        },
        true
      );
    });
  }
}

@Component({
  selector: 'sandbox-movement-regression',
  template: `
    <ngt-canvas
      shadows
      initialLog
      [dpr]="[1, 2]"
      [gl]="{ alpha: false, antialias: false }"
      [camera]="{ position: [0, 0, 0.8], fov: 75, near: 0.5, far: 1 }"
      (created)="onCreated($event.scene)"
    >
      <ngt-color attach="background" color="lightblue"></ngt-color>
      <ngt-fog attach="fog" [fog]="['#000', 0.8, 1]"></ngt-fog>

      <sandbox-scene></sandbox-scene>
    </ngt-canvas>
    <ngt-stats></ngt-stats>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [providePerformanceOptions({ min: 0.1 })],
})
export class MovementRegressionComponent {
  onCreated(scene: THREE.Scene) {
    setTimeout(() => {
      console.log(scene.toJSON());
    });
  }
}

@Component({
  selector: 'sandbox-scene',
  template: `
    <sandbox-lights></sandbox-lights>

    <sandbox-y-bot [position]="[0, -1.3, 0]"></sandbox-y-bot>
    <ngt-soba-text text="hello" [position]="[0, 0, -0.2]" fontSize="0.6" color="white" letterSpacing="0">
      <ngt-value [attach]="['material', 'fog']" [value]="false"></ngt-value>
    </ngt-soba-text>

    <ngt-mesh [scale]="4" [position]="[0, 1, -0.2]">
      <ngt-plane-geometry></ngt-plane-geometry>
      <ngt-mesh-standard-material
        color="lightblue"
        toneMapped="false"
        fog="false"
        envMapIntensity="0"
      ></ngt-mesh-standard-material>
    </ngt-mesh>

    <ngt-soba-adaptive-dpr pixelated></ngt-soba-adaptive-dpr>
    <sandbox-effects></sandbox-effects>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LerpedPointer],
})
export class Scene {
  constructor(lerpedPointer: LerpedPointer) {
    lerpedPointer.load();
  }
}

interface BotGLTF extends GLTF {
  nodes: {
    Alpha_Surface: THREE.Mesh;
    Alpha_Joints: THREE.Mesh;
  };
  materials: {
    Alpha_Body_MAT: THREE.MeshStandardMaterial;
    Alpha_Joints_MAT: THREE.MeshStandardMaterial;
  };
}

@Component({
  selector: 'sandbox-y-bot',
  template: `
    <ng-container *ngIf="bot$ | async as bot">
      <ngt-group (beforeRender)="onBeforeRender($event.object)" [dispose]="null" [position]="position">
        <ngt-mesh castShadow receiveShadow [geometry]="bot.nodes.Alpha_Surface.geometry">
          <ngt-mesh-standard-material
            metalness="0.4"
            roughness="0.2"
            [color]="bot.materials.Alpha_Body_MAT.color"
            [normalMap]="texture"
          >
            <ngt-vector2 [attach]="['normalMap', 'repeat']" [vector2]="[35, 35]"></ngt-vector2>
            <ngt-vector2 attach="normalScale" [vector2]="[0.15, 0.15]"></ngt-vector2>
          </ngt-mesh-standard-material>
        </ngt-mesh>
        <ngt-mesh castShadow [geometry]="bot.nodes.Alpha_Joints.geometry">
          <ngt-mesh-standard-material
            metalness="1"
            roughness="0.1"
            [color]="bot.materials.Alpha_Joints_MAT.color"
          ></ngt-mesh-standard-material>
        </ngt-mesh>
      </ngt-group>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YBot {
  @Input() position?: NgtVector3;

  readonly texture = new THREE.CanvasTexture(
    new FlakesTexture(),
    THREE.UVMapping,
    THREE.RepeatWrapping,
    THREE.RepeatWrapping
  );

  readonly bot$ = this.gltfLoader.load('assets/untitled-draco2.glb') as Observable<BotGLTF>;

  constructor(private lerpedPointer: LerpedPointer, private gltfLoader: NgtGLTFLoader) {}

  onBeforeRender(group: THREE.Group) {
    group.rotation.x = (this.lerpedPointer.pointerRef.value.y * Math.PI) / 200;
    group.rotation.y = (this.lerpedPointer.pointerRef.value.x * Math.PI) / 10;
  }
}

@Component({
  selector: 'sandbox-lights',
  template: `
    <ngt-directional-light intensity="1" [position]="[2, 2, 0]" color="red"></ngt-directional-light>
    <ngt-spot-light intensity="2" [position]="[-5, 10, 2]" angle="0.2" penumbra="1" castShadow>
      <ngt-vector2 [attach]="['shadow', 'mapSize']" [vector2]="[2048, 2048]"></ngt-vector2>
    </ngt-spot-light>
    <ngt-group (beforeRender)="onBeforeRender($event.object)">
      <ngt-rect-area-light
        intensity="2"
        [position]="[4.5, 0, -3]"
        width="10"
        height="10"
        (update)="onUpdate($event)"
      ></ngt-rect-area-light>
      <ngt-rect-area-light
        intensity="2"
        [position]="[-10, 2, -10]"
        width="15"
        height="15"
        (update)="onUpdate($event)"
      ></ngt-rect-area-light>
    </ngt-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Lights {
  constructor(private lerpedPointer: LerpedPointer) {}

  onUpdate($event: THREE.RectAreaLight) {
    console.log('ran?');
    $event.lookAt(0, 0, 0);
  }

  onBeforeRender(group: THREE.Group) {
    group.rotation.x = (this.lerpedPointer.pointerRef.value.x * Math.PI) / 2;
    group.rotation.y = Math.PI * 0.25 - (this.lerpedPointer.pointerRef.value.y * Math.PI) / 2;
  }
}

@Component({
  selector: 'sandbox-effects',
  template: `
    <ngt-effect-composer multisampling="8">
      <ng-template ngt-effect-composer-content>
        <ngt-ssao-effect
          [ref]="ssaoRef"
          [blendFunction]="blendFunction"
          intensity="15"
          radius="10"
          luminanceInfluence="0"
          bias="0.035"
        ></ngt-ssao-effect>
        <ngt-bloom-effect
          [kernelSize]="kernelSize"
          luminanceThreshold="0.55"
          luminanceSmoothing="0.2"
        ></ngt-bloom-effect>
      </ng-template>
    </ngt-effect-composer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Effects extends NgtComponentStore implements OnInit {
  readonly ssaoRef = new Ref<SSAOEffect>();
  readonly kernelSize = KernelSize.LARGE;
  readonly blendFunction = BlendFunction.MULTIPLY;

  constructor(private store: NgtStore) {
    super();
  }

  ngOnInit() {
    this.onCanvasReady(
      this.store.ready$,
      () =>
        this.store.registerBeforeRender({
          callback: ({ performance }) => {
            if (this.ssaoRef.value) {
              this.ssaoRef.value.blendMode.blendFunction =
                performance.current! < 1 ? BlendFunction.SKIP : BlendFunction.MULTIPLY;
            }
          },
        }),
      true
    );
  }
}

@NgModule({
  declarations: [MovementRegressionComponent, Scene, YBot, Lights, Effects],
  imports: [
    RouterModule.forChild([{ path: '', component: MovementRegressionComponent }]),
    CommonModule,
    NgtGroupModule,
    NgtMeshModule,
    NgtMeshStandardMaterialModule,
    NgtVector2AttributeModule,
    NgtDirectionalLightModule,
    NgtSpotLightModule,
    NgtRectAreaLightModule,
    NgtEffectComposerModule,
    NgtSSAOEffectModule,
    NgtBloomEffectModule,
    NgtCanvasModule,
    NgtColorAttributeModule,
    NgtFogAttributeModule,
    NgtSobaTextModule,
    NgtValueAttributeModule,
    NgtPlaneGeometryModule,
    NgtSobaAdapativeDprModule,
    NgtStatsModule,
  ],
})
export class MovementRegressionComponentModule {}
