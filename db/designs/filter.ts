import { Design as ApiDesign } from "celeste-api-types"
import chalk from "chalk"

import { Design } from "../interfaces"

export function includeApiDesign(design: ApiDesign) {
  // non-tradeable recipes are removed ones
  if (design.tradeable !== "true") {
    return false
  }
  return true
}

export function includeDesign(design: Design) {
  if (!design.name) {
    console.log(chalk.yellow(`SKIPPED - Design has no name:`), design)
    return false
  }
  if (design.name === "DebugProduction") {
    return false
  }
  // removed since 2013 or something
  if (design.name.endsWith("requires a craftsmen hall")) {
    return false
  }
  // initial recipe of each workshop
  if (!design.icon) {
    console.log(chalk.yellow(`SKIPPED - Design has no icon:`), design)
    return false
  }
  return true
}
