// GENERATED

import { ThreeControls } from '@angular-three/controls';
import type { ThreeCamera } from '@angular-three/core';
import { DestroyedService } from '@angular-three/core';
import { Directive } from '@angular/core';
import type { WebGLRenderer } from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

@Directive({
  selector: 'ngt-trackballControls',
  exportAs: 'ngtTrackballControls',
  providers: [DestroyedService],
})
export class TrackballControlsDirective extends ThreeControls<TrackballControls> {
  initControls(
    camera: ThreeCamera,
    renderer: WebGLRenderer
  ): TrackballControls {
    return new TrackballControls(camera, renderer.domElement);
  }
}