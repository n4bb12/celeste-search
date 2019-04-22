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
    const value = Math.abs(modified).toFixed(precision)
    const unit = "%"

    return sign + value + unit
  }

}
