import { Consumable } from "../interfaces"

export function compareConsumables(a: Consumable, b: Consumable) {
  return a.name.localeCompare(b.name)
}
