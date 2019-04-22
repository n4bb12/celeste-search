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
    const precision = +this.settings.controls.precision.value
    const base = (effect.amount - 1) * 100 + effect.scaling * 100 * (level + 3)
    const sign = base < 0 ? "-" : "+"
    const unit = "%"

    const modified = base * modifier
    const absolute = Math.abs(modified)
    const rounded = absolute.toFixed(precision)
    // const rounded = absolute.toFixed(precision + 1)
    // const truncated = rounded.substr(0, rounded.length - (precision === 0 ? 2 : 1))

    return sign + rounded + unit
  }

}
