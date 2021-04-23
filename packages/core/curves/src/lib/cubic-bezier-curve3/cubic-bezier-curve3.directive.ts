// GENERATED

import { Directive, Input } from '@angular/core';
import { CubicBezierCurve3 } from 'three';
import { ThreeCurve } from '../abstracts';

@Directive({
  selector: 'ngt-cubicBezierCurve3',
  exportAs: 'ngtCubicBezierCurve3',
  providers: [
    {
      provide: ThreeCurve,
      useExisting: CubicBezierCurve3Directive,
    },
  ],
})
export class CubicBezierCurve3Directive extends ThreeCurve<CubicBezierCurve3> {
  static ngAcceptInputType_args:
    | ConstructorParameters<typeof CubicBezierCurve3>
    | undefined;

  @Input() set args(v: ConstructorParameters<typeof CubicBezierCurve3>) {
    this.extraArgs = v;
  }

  curveType = CubicBezierCurve3;
}