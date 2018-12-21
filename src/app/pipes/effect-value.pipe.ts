import { Pipe, PipeTransform } from "@angular/core"

import { ItemEffect } from "../interfaces"

@Pipe({
  name: "effectValue",
})
export class EffectValuePipe implements PipeTransform {

  transform(effect: ItemEffect, level: number, modifier: number): string {
    const base = (effect.amount - 1) * 100 + effect.scaling * 100 * (level + 3)
    const modified = base * modifier
    const sign = base < 0 ? "-" : "+"
    const rounded = Math.abs(modified).toFixed(1)
    const unit = "%"
    return sign + rounded + unit
  }

}
