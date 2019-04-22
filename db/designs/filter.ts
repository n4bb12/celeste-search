import chalk from "chalk"

import { Design } from "../interfaces/Design"

export function includeDesign(design: Design) {
  if (!design.name) {
    console.log(chalk.yellow(`SKIPPED - Design has no name:`), design)
    return false
  }
  if (design.name === "DebugProduction") {
    return false
  }
  return true
}
