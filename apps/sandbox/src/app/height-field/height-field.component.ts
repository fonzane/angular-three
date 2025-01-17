import { NgtPhysicBody } from '@angular-three/cannon';
import { NgtTriple } from '@angular-three/core';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// @ts-ignore
import niceColors from 'nice-color-palettes';

@Component({
  selector: 'sandbox-height-field[elementSize][heights][position][rotation]',
  templateUrl: 'height-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgtPhysicBody],
})
export class HeightFieldComponent {
  @Input() elementSize = 0;
  @Input() heights: number[][] = [];
  @Input() position: NgtTriple = [0, 0, 0];
  @Input() rotation: NgtTriple = [0, 0, 0];

  readonly color = niceColors[17][4];

  heightFieldRef = this.physicBody.useHeightfield(() => ({
    args: [
      this.heights,
      {
        elementSize: this.elementSize,
      },
    ],
    position: this.position,
    rotation: this.rotation,
  }));

  constructor(private physicBody: NgtPhysicBody) {}
}
