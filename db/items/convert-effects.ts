import { Trait } from "celeste-api-types"
import { uniqBy } from "lodash"

import { ItemEffect } from "../interfaces"

import { convertEffectName } from "./convert-effect-name"

/**
 * Converts item effects from their API format to the format
 * used by the item search app.
 */
export function convertEffects(trait: Trait): ItemEffect[] {
  if (!trait.effects) {
    return
  }

  const converted = trait.effects.effect
    // Some effects are not displayed ingame.
    .filter(effect => {
      if (effect.subtype === "CarryCapacity") {
        return false
      }
      if (effect.subtype === "WorkRate" && effect.action === "SelfHeal") {
        return false
      }
      return true
    })
    .map(effect => {
      // This is the negative effect "Snare" that gets displayed ingame as a positive.
      if (effect.subtype === "TargetSpeedBoost") {
        effect.amount = 1 + (1 - effect.amount)
        effect.scaling = -effect.scaling
      }

      // The egyptian empower effects scale differently.
      if (effect.action === "Empower") {
        effect.amount = (effect.amount - 1) * 11 + 1
        effect.scaling *= 11
      }

      effect.amount = round(effect.amount, 5)
      effect.scaling = round(effect.scaling, 5)

      const itemEffect: ItemEffect = {
        name: convertEffectName(effect),
        amount: effect.amount,
        scaling: effect.scaling,
        beneficial: effect.bonus === "true",
      }

      return itemEffect
    })

  return uniqBy(converted, effect => effect.name)
}

/**
 * A Math.round wrapper that allows specifiying the desired
 * number of decimal places.
 */
function round(value: number, decimalPlaces: number) {
  const mult = Math.pow(10, decimalPlaces)
  return Math.round(value * mult) / mult
}
