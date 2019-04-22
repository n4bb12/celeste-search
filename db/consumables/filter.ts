import chalk from "chalk"

import { Consumable } from "../interfaces/Consumable"

export function includeConsumable(consumable: Consumable) {
  if (!consumable.name) {
    console.log(chalk.yellow(`SKIPPED - Consumable has no name:`), consumable)
    return false
  }
  if (consumable.name === "DebugProduction") {
    return false
  }
  return true
}
