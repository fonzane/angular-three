import {
  AnyConstructor,
  AnyFunction,
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  make,
  NgtCommonMesh,
  NgtInstance,
  NgtInstanceState,
  NgtMatrix4,
  NgtObject,
  NgtStore,
  NGT_HOST_BONE_REF,
  NGT_HOST_SKELETON_REF,
  NGT_HOST_SKINNED_MESH_REF,
  NumberInput,
  provideCommonMeshRef,
  provideInstanceRef,
  provideObjectRef,
  Ref,
  tapEffect,
} from '@angular-three/core';
import { ChangeDetectionStrategy, Component, Inject, Input, NgModule, NgZone, Optional, SkipSelf } from '@angular/core';
import { pipe, withLatestFrom } from 'rxjs';
import * as THREE from 'three';

@Component({
  selector: 'ngt-skinned-mesh',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCommonMeshRef(NgtSkinnedMesh)],
})
export class NgtSkinnedMesh extends NgtCommonMesh<THREE.SkinnedMesh> {
  @Input() set skeleton(skeleton: THREE.Skeleton) {
    this.set({ skeleton });
  }

  @Input() set useVertexTexture(useVertexTexture: BooleanInput) {
    this.set({ useVertexTexture: coerceBooleanProperty(useVertexTexture) });
  }

  @Input() set bindMatrix(bindMatrix: NgtMatrix4) {
    this.set({ bindMatrix: make(THREE.Matrix4, bindMatrix) });
  }

  @Input() set bindMatrixInverse(bindMatrixInverse: NgtMatrix4) {
    this.set({
      bindMatrixInverse: make(THREE.Matrix4, bindMatrixInverse),
    });
  }

  @Input() set bindMode(bindMode: string) {
    this.set({ bindMode });
  }

  override get meshType(): AnyConstructor<THREE.SkinnedMesh> {
    return THREE.SkinnedMesh;
  }

  protected override get argsKeys(): string[] {
    return ['useVertexTexture'];
  }

  protected override get optionFields(): Record<string, boolean> {
    return {
      ...super.optionFields,
      bindMatrix: true,
      bindMatrixInverse: true,
      bindMode: true,
      skeleton: true,
    };
  }

  bind(skeleton: THREE.Skeleton) {
    this.instance.value.bind(
      skeleton,
      this.get((s) => s['bindMatrix'])
    );
  }
}

export interface NgtSkeletonState extends NgtInstanceState<THREE.Skeleton> {
  bones: THREE.Bone[];
  boneInverses: THREE.Matrix4[];
  boneMatrices: Float32Array;
  boneTexture: null | THREE.DataTexture;
  boneTextureSize: number;
  frame: number;
}

@Component({
  selector: 'ngt-skeleton',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideInstanceRef(NgtSkeleton)],
})
export class NgtSkeleton extends NgtInstance<THREE.Skeleton, NgtSkeletonState> {
  @Input() set args(args: ConstructorParameters<typeof THREE.Skeleton>) {
    this.set({ instanceArgs: args });
  }

  @Input() set bones(bones: THREE.Bone[]) {
    this.set({ bones });
  }

  @Input() set boneInverses(boneInverses: NgtMatrix4[]) {
    this.set({
      boneInverses: boneInverses.map((datum) => make(THREE.Matrix4, datum)),
    });
  }

  @Input() set boneMatrices(boneMatrices: Float32Array) {
    this.set({ boneMatrices });
  }

  @Input() set boneTexture(boneTexture: null | THREE.DataTexture) {
    this.set({ boneTexture });
  }

  @Input() set boneTextureSize(boneTextureSize: NumberInput) {
    this.set({ boneTextureSize: coerceNumberProperty(boneTextureSize) });
  }

  @Input() set frame(frame: NumberInput) {
    this.set({ frame: coerceNumberProperty(frame) });
  }

  constructor(
    zone: NgZone,
    store: NgtStore,
    @Optional()
    @SkipSelf()
    @Inject(NGT_HOST_SKINNED_MESH_REF)
    parentHostRef: AnyFunction<Ref<THREE.SkinnedMesh>>,
    @Optional() private skinnedMesh: NgtSkinnedMesh
  ) {
    if (parentHostRef && !parentHostRef().value.isSkinnedMesh) {
      throw new Error('<ngt-skeleton> can only be used within <ngt-skinned-mesh>');
    }

    super(zone, store, () => skinnedMesh?.instance, parentHostRef);
  }

  protected override preInit() {
    this.set((state) => ({
      attach: state.attach.length ? state.attach : ['skeleton'],
      bones: state.bones || [],
      boneInverses: state.boneInverses || [],
      boneMatrices: state.boneMatrices || (null as unknown as Float32Array),
      boneTexture: state.boneTexture || null,
      boneTextureSize: state.boneTextureSize || 0,
      frame: state.frame || -1,
    }));
  }

  override ngOnInit() {
    super.ngOnInit();
    this.onCanvasReady(this.store.ready$, () => {
      this.init(this.instanceArgs$);
    });
  }

  private readonly init = this.effect<unknown[]>(
    pipe(
      withLatestFrom(
        this.select(
          this.select((s) => s.bones),
          this.select((s) => s.boneInverses),
          (bones, boneInverses) => ({ bones, boneInverses })
        )
      ),
      tapEffect(([instanceArgs, { bones, boneInverses }]) => {
        const skeletonArgs = [...instanceArgs];

        if (skeletonArgs.length === 0) {
          if (bones.length) {
            skeletonArgs[0] = bones;
          }

          if (boneInverses.length) {
            skeletonArgs[1] = boneInverses;
          }
        }

        const skeleton = this.prepareInstance(
          new THREE.Skeleton(...(skeletonArgs as ConstructorParameters<typeof THREE.Skeleton>))
        );

        if (!this.skinnedMesh.instance.value.skeleton) {
          this.skinnedMesh.bind(skeleton);
        }

        return () => {
          skeleton.dispose();
        };
      })
    )
  );

  protected override get optionFields(): Record<string, boolean> {
    return {
      ...super.optionFields,
      bones: false,
      boneTexture: false,
      boneTextureSize: false,
      boneMatrices: false,
      boneInverses: false,
      frame: false,
    };
  }
}

@Component({
  selector: 'ngt-bone',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideObjectRef(NgtBone)],
})
export class NgtBone extends NgtObject<THREE.Bone> {
  constructor(
    zone: NgZone,
    store: NgtStore,
    @Optional() @SkipSelf() private parentBone: NgtBone,
    @Optional() private parentSkinnedMesh: NgtSkinnedMesh,
    @Optional() private parentSkeleton: NgtSkeleton,
    @Optional()
    @SkipSelf()
    @Inject(NGT_HOST_BONE_REF)
    private hostBoneRef: AnyFunction<Ref>,
    @Optional()
    @SkipSelf()
    @Inject(NGT_HOST_SKELETON_REF)
    private hostSkeletonRef: AnyFunction<Ref>,
    @Optional()
    @SkipSelf()
    @Inject(NGT_HOST_SKINNED_MESH_REF)
    private hostSkinnedMeshRef: AnyFunction<Ref>
  ) {
    super(
      zone,
      store,
      () => (parentBone?.instance || parentSkinnedMesh?.instance) as Ref,
      (hostBoneRef || hostSkinnedMeshRef) as AnyFunction
    );
  }

  protected override objectInitFn(): THREE.Bone {
    return new THREE.Bone();
  }

  protected override postPrepare(bone: THREE.Bone) {
    if (this.parentSkeleton) {
      this.parentSkeleton.instance.value.bones.push(bone);
    } else if (this.hostSkeletonRef) {
      this.hostSkeletonRef().value.bones.push(bone);
    }
  }
}

@NgModule({
  declarations: [NgtSkinnedMesh, NgtSkeleton, NgtBone],
  exports: [NgtSkinnedMesh, NgtSkeleton, NgtBone],
})
export class NgtSkinnedMeshModule {}
