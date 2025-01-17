// GENERATED
import { AnyConstructor, coerceNumberProperty, NumberInput } from '@angular-three/core';
import { NgtCommonEffect, provideCommonEffectRef } from '@angular-three/postprocessing';
import { ChangeDetectionStrategy, Component, NgModule, Input } from '@angular/core';
import { BlendFunction, BloomEffect, KernelSize } from 'postprocessing';

@Component({
  selector: 'ngt-bloom-effect',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCommonEffectRef(NgtBloomEffect)],
})
export class NgtBloomEffect extends NgtCommonEffect<BloomEffect> {
  override get effectType(): AnyConstructor<BloomEffect> {
    return BloomEffect;
  }

  @Input() set luminanceThreshold(luminanceThreshold: NumberInput) {
    this.set({ luminanceThreshold: coerceNumberProperty(luminanceThreshold) });
  }

  @Input() set luminanceSmoothing(luminanceSmoothing: NumberInput) {
    this.set({ luminanceSmoothing: coerceNumberProperty(luminanceSmoothing) });
  }

  @Input() set resolutionScale(resolutionScale: NumberInput) {
    this.set({ resolutionScale: coerceNumberProperty(resolutionScale) });
  }

  @Input() set intensity(intensity: NumberInput) {
    this.set({ intensity: coerceNumberProperty(intensity) });
  }

  @Input() set width(width: NumberInput) {
    this.set({ width: coerceNumberProperty(width) });
  }

  @Input() set height(height: NumberInput) {
    this.set({ height: coerceNumberProperty(height) });
  }

  @Input() set kernelSize(kernelSize: KernelSize) {
    this.set({ kernelSize });
  }

  protected override get defaultBlendMode(): BlendFunction {
    return BlendFunction.SCREEN;
  }

  protected override get effectOptionsFields(): Record<string, boolean> {
    return {
      ...super.effectOptionsFields,
      luminanceThreshold: true,
      luminanceSmoothing: true,
      resolutionScale: true,
      intensity: true,
      width: true,
      height: true,
      kernelSize: true,
    };
  }
}

@NgModule({
  declarations: [NgtBloomEffect],
  exports: [NgtBloomEffect],
})
export class NgtBloomEffectModule {}
