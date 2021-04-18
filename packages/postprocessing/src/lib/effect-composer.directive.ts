import { CanvasStore, DestroyedService } from '@angular-three/core';
import { Directive, Input, NgZone, OnInit, SkipSelf } from '@angular/core';
import { race } from 'rxjs';
import { distinctUntilKeyChanged, pluck, takeUntil } from 'rxjs/operators';
import type { WebGLRenderTarget } from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

@Directive({
  selector: 'ngt-effectComposer',
  exportAs: 'ngtEffectComposer',
  providers: [DestroyedService],
})
export class EffectComposerDirective implements OnInit {
  @Input() renderTarget?: WebGLRenderTarget;
  @Input() watchSizeChanged = true;

  constructor(
    @SkipSelf() private readonly canvasStore: CanvasStore,
    private readonly destroyed: DestroyedService,
    private readonly ngZone: NgZone
  ) {}

  private _composer!: EffectComposer;

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.canvasStore.active$
        .pipe(takeUntil(this.destroyed))
        .subscribe((active) => {
          const { renderer } = this.canvasStore.getImperativeState();
          if (active && renderer) {
            this._composer = new EffectComposer(renderer, this.renderTarget);

            if (this.watchSizeChanged) {
              // nested subscription
              this.canvasStore.canvasInternal$
                .pipe(
                  distinctUntilKeyChanged('size'),
                  pluck('size'),
                  takeUntil(race(this.canvasStore.active$, this.destroyed))
                )
                .subscribe(({ width, height }) => {
                  this._composer.setSize(width, height);
                });
            }
          }
        });
    });
  }

  get composer(): EffectComposer {
    return this._composer;
  }
}
