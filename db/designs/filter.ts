import chalk from "chalk"

import { Design } from "../interfaces"

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
  return true
}
