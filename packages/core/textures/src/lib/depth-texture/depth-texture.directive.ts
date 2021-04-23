// GENERATED

import { Directive, Input } from '@angular/core';
import { DepthTexture } from 'three';
import { ThreeTexture } from '../abstracts';

@Directive({
  selector: 'ngt-depthTexture',
  exportAs: 'ngtDepthTexture',
  providers: [
    {
      provide: ThreeTexture,
      useExisting: DepthTextureDirective,
    },
  ],
})
export class DepthTextureDirective extends ThreeTexture<DepthTexture> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof DepthTexture>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof DepthTexture>) {
    this.extraArgs = v;
  }

  textureType = DepthTexture;
}