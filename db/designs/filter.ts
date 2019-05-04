import { Design as ApiDesign } from "celeste-api-types"
import chalk from "chalk"
import yn from "yn"

import { Design } from "../interfaces"

export function includeApiDesign(design: ApiDesign) {
  // non-tradeable recipes are removed ones
  if (!yn(design.tradeable)) {
    return false
  }
  // FIXME: add these once we have consumables in the API
  if ((design.output as any).consumable) {
    return false
  }
  if (design.name === "DebugProduction") {
    return false
  }
  return true
}

export function includeDesign(design: Design) {
  if (!design.outputName) {
    console.log(chalk.yellow(`SKIPPED - Design has no outputName:`), design.id)
    return false
  }
  // initial recipe of each workshop
  if (!design.icon) {
    console.log(chalk.yellow(`SKIPPED - Design has no icon:`), design.id)
    return false
  }
  // removed since 2013 or something
  if (design.outputName.endsWith("requires a craftsmen hall")) {
    return false
  }
  return true
}
