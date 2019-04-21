import { Pipe, PipeTransform } from "@angular/core"

import { ItemEffect } from "../interfaces"
import { SettingsService } from "../services/settings.service"

@Pipe({
  name: "effectValue",
  pure: false,
})
export class EffectValuePipe implements PipeTransform {

  constructor(
    private settings: SettingsService,
  ) { }

  transform(effect: ItemEffect, level: number, modifier: number): string {
    const base = (effect.amount - 1) * 100 + effect.scaling * 100 * (level + 3)
    const modified = base * modifier
    const precision = +this.settings.controls.precision.value

    const sign = base < 0 ? "-" : "+"
    const value = this.toFixed(Math.abs(modified), precision)
    const unit = "%"

    return sign + value + unit
  }

  private toFixed(value: number, precision: number): string {
    return this.toPrecisionFloor(value, precision).toFixed(precision)
  }

  private toPrecisionFloor(value: number, precision: number): number {
    return Math.floor(Math.abs(value) * Math.pow(10, precision)) / Math.pow(10, precision)
  }

}
