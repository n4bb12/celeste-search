import chalk from "chalk"

import { Blueprint } from "../interfaces"

export function includeBlueprint(blueprint: Blueprint) {
  if (blueprint.description) {
    return true
  }
  console.log(chalk.yellow(`SKIPPED - Blueprint has no description: ${blueprint.name}`))
}
