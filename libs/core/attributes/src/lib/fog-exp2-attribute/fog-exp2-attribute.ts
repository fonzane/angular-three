// GENERATED
import { make, NgtInstance, provideInstanceRef, NgtFogExp2 } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, Input, NgModule } from '@angular/core';
import type { Subscription } from 'rxjs';
import * as THREE from 'three';

@Component({
  selector: 'ngt-fog-exp2[fogExp2]',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideInstanceRef(NgtFogExp2Attribute)],
})
export class NgtFogExp2Attribute extends NgtInstance<THREE.FogExp2> {
  @Input() set fogExp2(fogExp2: NgtFogExp2) {
    this.zone.runOutsideAngular(() => {
      if (this.initSubscription) {
        this.initSubscription.unsubscribe();
      }

      this.initSubscription = this.onCanvasReady(
        this.store.ready$,
        () => {
          this.prepareInstance(make(THREE.FogExp2, fogExp2));
          return () => {
            this.initSubscription?.unsubscribe();
          };
        },
        true
      );
    });
  }

  private initSubscription?: Subscription;
}

@NgModule({
  declarations: [NgtFogExp2Attribute],
  exports: [NgtFogExp2Attribute],
})
export class NgtFogExp2AttributeModule {}
